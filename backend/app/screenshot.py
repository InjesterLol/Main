"""Capture a screenshot of a URL using Playwright."""

import base64
import os
from pathlib import Path

from playwright.async_api import async_playwright

# Pre-captured screenshots for sites with aggressive bot detection
STATIC_DIR = Path(__file__).parent / "static"
STATIC_SCREENSHOTS = {
    "united.com": STATIC_DIR / "united_screenshot.png",
    "airbnb.com": STATIC_DIR / "airbnb_screenshot.png",
}


def _get_static_screenshot(url: str):
    """Check if we have a pre-captured screenshot for this domain."""
    for domain, path in STATIC_SCREENSHOTS.items():
        if domain in url and path.exists():
            return base64.b64encode(path.read_bytes()).decode("utf-8")
    return None


async def capture_screenshot(url: str, width: int = 1280, height: int = 800) -> str:
    """Navigate to a URL and return a base64-encoded PNG screenshot.

    Uses pre-captured screenshots for known bot-protected sites.
    Falls back to Firefox for better compatibility with anti-bot measures.
    """
    # Check for static screenshot first
    static = _get_static_screenshot(url)
    if static:
        return static

    # Try Firefox first (better at bypassing bot detection)
    async with async_playwright() as p:
        try:
            browser = await p.firefox.launch(headless=True)
        except Exception:
            # Fall back to Chromium if Firefox not installed
            browser = await p.chromium.launch(
                headless=True,
                args=["--disable-blink-features=AutomationControlled"],
            )

        page = await browser.new_page(viewport={"width": width, "height": height})

        try:
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        except Exception:
            pass

        # Wait for JS-heavy SPAs to render
        await page.wait_for_timeout(5000)

        screenshot_bytes = await page.screenshot(type="png")
        await browser.close()

        # If screenshot is suspiciously small (< 10KB), it's likely blank
        if len(screenshot_bytes) < 10000:
            # Return it anyway, but log a warning
            print(f"Warning: Screenshot for {url} is only {len(screenshot_bytes)} bytes (possibly blank)")

        return base64.b64encode(screenshot_bytes).decode("utf-8")

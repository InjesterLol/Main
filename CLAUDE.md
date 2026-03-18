# Injester

AI data ingestion platform — transforms web pages into agent-native format in ~90 seconds.
"The missing layer between the human web and AI agents."

## Quick Start

```bash
# Backend
cd backend && source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend
cd frontend && npm run dev -- --host 0.0.0.0
# Vite serves on :5173, proxies /api/ → :8000
```

## Repos

| Repo | Visibility | Purpose |
|------|-----------|---------|
| `InjesterLol/injester` | Public | Landing, docs, demo code |
| `InjesterLol/injester-internal` | Private | Active development |

Local remotes: `origin` → public, `internal` → private.
Tomorrow (2026-03-19): swap origin to injester-internal.

## Domains

- **injester.com** — Landing page / pitch / Google Slides
- **injester.lol** — Live app prototype (shared host, backend not deployed)

## Stack

| Layer | Tool |
|-------|------|
| Backend | FastAPI (Python 3.9) |
| Frontend | React + Vite |
| Extraction | Tavily Extract API |
| LLM | Nebius Token Factory — `nvidia/nemotron-3-super-120b-a12b` |
| Agent | Playwright (chromium) |

## Environment

Backend `.env` at `backend/.env`:
```
TAVILY_API_KEY=...
NEBIUS_API_KEY=...
NEBIUS_BASE_URL=https://api.studio.nebius.ai/v1/
NEBIUS_MODEL=nvidia/nemotron-3-super-120b-a12b
```

Nebius API key stored in 1Password: "Injester.lol Token Factory API" (Clawdbot vault).

## Architecture

```
URL → Tavily Extract → Nebius LLM → Karpathy Loop (3 iterations, self-improving)
  → Benchmark (raw vs optimized) → Three-Panel UI (Human Web | AI View | Score)
```

For booking sites (united/airbnb): full agent flow with Playwright browser.
For general sites: optimize-only mode, no agent.

## Demo Sites

- **united.com** — flight search (5 agent tasks)
- **airbnb.com** — listing page (5 agent tasks)
- Static screenshots pre-cached in `backend/app/static/`

## AWP Ecosystem

Injester generates agent-ready layers for sites that haven't adopted AWP.

| Project | Repo | Local |
|---------|------|-------|
| Agent Web Protocol | agentwebprotocol/agentwebprotocol.org | ~/agentwebprotocol.org/ |
| agent.json spec | agentwebprotocol/agent-json.org | ~/agent-json.org/ |

## Team

- Ben (@Bshyong158) — Nebius + Tavily API, demo, pitch, architecture
- Vishal (@slowpoison) — FastAPI pipeline, Karpathy loop, benchmark
- Alex (@shirazi) — Three-panel UI, score visualization, landing page

## Known Issues

- Nebius models rotate — always verify model ID via API before changing
- Venv has hardcoded paths — if you rename the project folder, recreate venv
- Playwright browsers must be installed separately: `playwright install chromium`
- `localhost:8000` is hardcoded in routes.py for agent optimized URL — won't work on remote deploy without fix
- Generated HTML files in `backend/generated/` accumulate, no cleanup

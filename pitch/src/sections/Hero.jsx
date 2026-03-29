import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const taglineRef = useRef(null)
  const scrollRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-stats .stat',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.2'
        )

      // Floating scroll indicator
      gsap.to(scrollRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        <span className="hero-label label label-orange">INJESTER</span>

        <h1 ref={titleRef} className="hero-title">
          The Web Wasn't Built
          <br />
          <span className="hero-title-accent">for AI Agents</span>
        </h1>

        <p ref={subtitleRef} className="hero-subtitle">
          The missing layer between the human web and AI agents.
          <br />
          Turn messy HTML into agent-native pages in 90 seconds.
        </p>

        <p ref={taglineRef} className="hero-tagline mono">
          Raw URL &rarr; Extract &rarr; Optimize &rarr; Self-Improve &rarr; Agent-Ready
        </p>

        <div ref={statsRef} className="hero-stats">
          <div className="stat">
            <span className="stat-value">81%</span>
            <span className="stat-label">content reduction</span>
          </div>
          <div className="stat">
            <span className="stat-value">3-5x</span>
            <span className="stat-label">agent task completion</span>
          </div>
          <div className="stat">
            <span className="stat-value">~90s</span>
            <span className="stat-label">end to end</span>
          </div>
        </div>

        <div ref={scrollRef} className="scroll-indicator">
          <span className="scroll-text mono">scroll to explore</span>
          <span className="scroll-arrow">&darr;</span>
        </div>
      </div>
    </section>
  )
}

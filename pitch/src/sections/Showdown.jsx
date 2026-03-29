import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Showdown.css'

const RAW_TASKS = [
  { name: 'Search for flights', status: 'failed', detail: 'Could not find search form — buried in 45K tokens of HTML' },
  { name: 'Select departure airport', status: 'failed', detail: 'Input field not identified — ambiguous selectors' },
  { name: 'Choose cabin class', status: 'partial', detail: 'Found dropdown but selected wrong option' },
  { name: 'Set travel dates', status: 'failed', detail: 'Date picker not rendered — requires JS interaction' },
  { name: 'Submit search', status: 'failed', detail: 'Never reached submit — stuck on previous steps' },
]

const OPTIMIZED_TASKS = [
  { name: 'Search for flights', status: 'success', detail: 'form[action="/api/search"] identified instantly' },
  { name: 'Select departure airport', status: 'success', detail: 'input[placeholder="From"] — filled "SFO"' },
  { name: 'Choose cabin class', status: 'success', detail: 'cabin_class entity → selected "Business"' },
  { name: 'Set travel dates', status: 'success', detail: 'dates entity → "2026-04-15" departure' },
  { name: 'Submit search', status: 'success', detail: 'search_flights action → form submitted' },
]

export default function Showdown() {
  const sectionRef = useRef(null)
  const [showOptimized, setShowOptimized] = useState(false)
  const [revealScore, setRevealScore] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showdown-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      ScrollTrigger.create({
        trigger: '.showdown-panels',
        start: 'top 50%',
        onEnter: () => {
          // Reveal raw tasks one by one
          gsap.to('.raw-task', { opacity: 1, x: 0, duration: 0.3, stagger: 0.15 })
          // Then reveal optimized
          gsap.delayedCall(1.5, () => {
            setShowOptimized(true)
            gsap.to('.opt-task', { opacity: 1, x: 0, duration: 0.3, stagger: 0.15, delay: 0.2 })
            gsap.delayedCall(2, () => setRevealScore(true))
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="showdown-section">
      <div className="showdown-inner">
        <span className="label label-purple">THE SHOWDOWN</span>
        <h2 className="showdown-title">
          Same agent. Same task. <span className="accent-green">Different results.</span>
        </h2>
        <p className="showdown-desc">
          We run the same Playwright agent with the same booking task on the raw site
          and the Injester-optimized version. Watch what happens.
        </p>

        <div className="showdown-panels">
          {/* Raw panel */}
          <div className="showdown-panel panel-raw">
            <div className="panel-header">
              <span className="panel-badge badge-raw mono">RAW SITE</span>
              <span className="panel-score mono">
                {revealScore ? '1/5' : '—'}
              </span>
            </div>
            <div className="task-list">
              {RAW_TASKS.map((task, i) => (
                <div key={i} className="task-item raw-task" style={{ opacity: 0, transform: 'translateX(-10px)' }}>
                  <div className="task-status">
                    <span className={`status-icon status-${task.status}`}>
                      {task.status === 'failed' ? '✕' : task.status === 'partial' ? '◐' : '✓'}
                    </span>
                  </div>
                  <div className="task-info">
                    <span className="task-name">{task.name}</span>
                    <span className="task-detail">{task.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimized panel */}
          <div className={`showdown-panel panel-opt ${showOptimized ? 'visible' : ''}`}>
            <div className="panel-header">
              <span className="panel-badge badge-opt mono">INJESTER</span>
              <span className="panel-score mono">
                {revealScore ? '5/5' : '—'}
              </span>
            </div>
            <div className="task-list">
              {OPTIMIZED_TASKS.map((task, i) => (
                <div key={i} className="task-item opt-task" style={{ opacity: 0, transform: 'translateX(-10px)' }}>
                  <div className="task-status">
                    <span className={`status-icon status-${task.status}`}>✓</span>
                  </div>
                  <div className="task-info">
                    <span className="task-name">{task.name}</span>
                    <span className="task-detail">{task.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score reveal */}
        <div className={`score-reveal ${revealScore ? 'visible' : ''}`}>
          <div className="score-card">
            <span className="score-label mono">CONTENT REDUCTION</span>
            <span className="score-big mono">81%</span>
          </div>
          <div className="score-card">
            <span className="score-label mono">TOKEN SAVINGS</span>
            <span className="score-big mono">78%</span>
          </div>
          <div className="score-card">
            <span className="score-label mono">TASK COMPLETION</span>
            <span className="score-big score-highlight mono">1 → 5</span>
          </div>
          <div className="score-card">
            <span className="score-label mono">COST PER QUERY</span>
            <span className="score-big mono">$0.30 → $0.07</span>
          </div>
        </div>
      </div>
    </section>
  )
}

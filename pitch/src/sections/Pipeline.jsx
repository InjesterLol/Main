import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Pipeline.css'

const OPTIMIZED_JSON = {
  page_intent: 'Flight booking search — find and book flights',
  primary_entities: [
    { type: 'form_field', name: 'trip_type', values: ['Round trip', 'One-way', 'Multi-city'] },
    { type: 'form_field', name: 'origin', values: ['Airport or city'] },
    { type: 'form_field', name: 'destination', values: ['Airport or city'] },
    { type: 'form_field', name: 'dates', values: ['Departure', 'Return'] },
    { type: 'form_field', name: 'passengers', values: ['Adults', 'Children'] },
    { type: 'form_field', name: 'cabin_class', values: ['Economy', 'Business', 'First'] },
  ],
  agent_actions: [
    { action: 'search_flights', selector: 'form[action="/api/search"]', type: 'submit' },
    { action: 'set_trip_type', selector: '.trip-type label', type: 'click' },
    { action: 'enter_origin', selector: 'input[placeholder="From"]', type: 'fill' },
    { action: 'enter_destination', selector: 'input[placeholder="To"]', type: 'fill' },
  ],
  key_facts: [
    'United Airlines flight search portal',
    'Supports round-trip, one-way, and multi-city',
    'MileagePlus loyalty program integration',
    'Cabin classes: Economy, Business, First',
    'Direct booking with no intermediary',
  ],
  noise_removed_pct: 81,
}

const KARPATHY_ITERATIONS = [
  {
    version: 1,
    score: 3,
    total: 5,
    failed: ['What cabin classes are available?', 'Does the site support multi-city trips?'],
    prompt_change: null,
  },
  {
    version: 2,
    score: 4,
    total: 5,
    failed: ['Does the site support multi-city trips?'],
    prompt_change: 'Added: "Extract ALL option values from select/radio inputs, including trip type variants"',
  },
  {
    version: 3,
    score: 5,
    total: 5,
    failed: [],
    prompt_change: 'Added: "For travel sites, explicitly enumerate trip-type options (round-trip, one-way, multi-city)"',
  },
]

export default function Pipeline() {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [activeIteration, setActiveIteration] = useState(-1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step 1: Extract
      ScrollTrigger.create({
        trigger: '.pipeline-step-extract',
        start: 'top 60%',
        onEnter: () => setActiveStep(1),
      })

      // Step 2: Optimize
      ScrollTrigger.create({
        trigger: '.pipeline-step-optimize',
        start: 'top 60%',
        onEnter: () => setActiveStep(2),
      })

      // Step 3: Karpathy Loop
      ScrollTrigger.create({
        trigger: '.pipeline-step-loop',
        start: 'top 60%',
        onEnter: () => setActiveStep(3),
      })

      // Karpathy iterations
      KARPATHY_ITERATIONS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.karpathy-iter-${i}`,
          start: 'top 65%',
          onEnter: () => setActiveIteration(i),
        })
      })

      // Animate text entries
      gsap.utils.toArray('.pipeline-step').forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: { trigger: step, start: 'top 75%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pipeline-section">
      <div className="pipeline-inner">
        <div className="pipeline-text">
          <span className="label label-blue">THE PIPELINE</span>
          <h2 className="pipeline-title">
            How Injester transforms a page
          </h2>

          {/* Step 1: Extract */}
          <div className="pipeline-step pipeline-step-extract">
            <div className="step-header">
              <span className="step-num mono">01</span>
              <span className="step-badge label-green label">EXTRACT</span>
            </div>
            <h3>Strip the noise</h3>
            <p>
              Tavily Extract pulls clean text from any URL. For JS-heavy SPAs,
              Playwright renders the page first. Scripts, styles, navs, footers,
              cookie banners — all stripped. What's left is the actual content.
            </p>
            <div className="step-metric">
              <span className="metric-val mono">45,280 → 8,540</span>
              <span className="metric-label">tokens after extraction</span>
            </div>
          </div>

          {/* Step 2: Optimize */}
          <div className="pipeline-step pipeline-step-optimize">
            <div className="step-header">
              <span className="step-num mono">02</span>
              <span className="step-badge label-blue label">OPTIMIZE</span>
            </div>
            <h3>Restructure for agents</h3>
            <p>
              A Nebius LLM reads the extracted content and restructures it into
              agent-native JSON: page intent, typed entities, actionable selectors,
              and key facts. Everything an agent needs, nothing it doesn't.
            </p>
            <div className="step-metric">
              <span className="metric-val mono">8,540 → 1,823</span>
              <span className="metric-label">tokens after optimization</span>
            </div>
          </div>

          {/* Step 3: Karpathy Loop */}
          <div className="pipeline-step pipeline-step-loop">
            <div className="step-header">
              <span className="step-num mono">03</span>
              <span className="step-badge label-orange label">SELF-IMPROVE</span>
            </div>
            <h3>The Karpathy Loop</h3>
            <p>
              Injester doesn't just optimize once — it benchmarks its own output
              against test questions, identifies what failed, rewrites its own
              prompt, and tries again. Up to 3 iterations, keeping the best result.
            </p>
          </div>

          {/* Karpathy iteration details */}
          {KARPATHY_ITERATIONS.map((iter, i) => (
            <div key={i} className={`pipeline-step karpathy-detail karpathy-iter-${i}`}>
              <div className="iter-header">
                <span className={`iter-badge ${iter.score === iter.total ? 'perfect' : ''}`}>
                  v{iter.version}
                </span>
                <span className="iter-score mono">
                  {iter.score}/{iter.total}
                </span>
              </div>
              {iter.failed.length > 0 && (
                <div className="iter-failed">
                  <span className="iter-failed-label">Failed:</span>
                  {iter.failed.map((q, j) => (
                    <span key={j} className="iter-failed-q">"{q}"</span>
                  ))}
                </div>
              )}
              {iter.prompt_change && (
                <div className="iter-fix">
                  <span className="iter-fix-label">Prompt fix:</span>
                  <span className="iter-fix-text">{iter.prompt_change}</span>
                </div>
              )}
              {iter.score === iter.total && (
                <div className="iter-perfect">All questions answered correctly</div>
              )}
            </div>
          ))}
        </div>

        {/* Sticky visualization */}
        <div className="pipeline-viz">
          <PipelineViz activeStep={activeStep} activeIteration={activeIteration} />
        </div>
      </div>
    </section>
  )
}

function PipelineViz({ activeStep, activeIteration }) {
  return (
    <div className="viz-container">
      {/* Step indicator */}
      <div className="viz-steps">
        {['Extract', 'Optimize', 'Self-Improve'].map((name, i) => (
          <div key={i} className={`viz-step-dot ${activeStep > i ? 'done' : ''} ${activeStep === i + 1 ? 'active' : ''}`}>
            <span className="dot" />
            <span className="dot-label mono">{name}</span>
          </div>
        ))}
      </div>

      {/* Dynamic content based on step */}
      {activeStep <= 1 && (
        <div className="viz-panel viz-extract">
          <div className="viz-panel-header">
            <span className="mono">EXTRACTION</span>
            <span className="viz-badge-green mono">Tavily + Playwright</span>
          </div>
          <div className="viz-flow">
            <div className="flow-box flow-raw">
              <span className="flow-label">Raw HTML</span>
              <span className="flow-tokens mono">45,280 tok</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-box flow-strip">
              <span className="flow-label">Strip noise</span>
              <span className="flow-detail mono">-scripts -css -nav -footer</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className={`flow-box flow-clean ${activeStep >= 1 ? 'active' : ''}`}>
              <span className="flow-label">Clean text</span>
              <span className="flow-tokens mono">8,540 tok</span>
            </div>
          </div>
          <div className="viz-reduction">
            <div className="reduction-bar">
              <div className="reduction-fill" style={{ width: activeStep >= 1 ? '81%' : '0%' }} />
            </div>
            <span className="reduction-label mono">81% noise removed</span>
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="viz-panel viz-optimize">
          <div className="viz-panel-header">
            <span className="mono">OPTIMIZED OUTPUT</span>
            <span className="viz-badge-blue mono">Nebius LLM</span>
          </div>
          <div className="viz-json">
            <pre className="json-display">
              {JSON.stringify(OPTIMIZED_JSON, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {activeStep >= 3 && (
        <div className="viz-panel viz-loop">
          <div className="viz-panel-header">
            <span className="mono">KARPATHY LOOP</span>
            <span className="viz-badge-orange mono">Self-Improving</span>
          </div>
          <div className="loop-timeline">
            {KARPATHY_ITERATIONS.map((iter, i) => (
              <div
                key={i}
                className={`loop-node ${activeIteration >= i ? 'visible' : ''} ${
                  iter.score === iter.total ? 'perfect' : ''
                } ${activeIteration === i ? 'current' : ''}`}
              >
                <div className="loop-node-header">
                  <span className="loop-version mono">v{iter.version}</span>
                  <span className={`loop-score mono ${iter.score === iter.total ? 'score-perfect' : ''}`}>
                    {iter.score}/{iter.total}
                  </span>
                </div>
                <div className="loop-bar">
                  <div
                    className="loop-bar-fill"
                    style={{ width: `${(iter.score / iter.total) * 100}%` }}
                  />
                </div>
                {iter.prompt_change && activeIteration >= i && (
                  <div className="loop-change mono">{iter.prompt_change}</div>
                )}
                {i < KARPATHY_ITERATIONS.length - 1 && (
                  <div className="loop-connector">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

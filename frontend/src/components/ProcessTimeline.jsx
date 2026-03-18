import { useState } from 'react'

function getNodeColor(score, total) {
  if (score === total) return 'var(--accent-green)'
  if (score >= total / 2) return 'var(--accent-yellow)'
  return 'var(--accent-red)'
}

export default function ProcessTimeline({ loopLog, visible, running }) {
  const [expandedNode, setExpandedNode] = useState(null)

  if (!visible || !loopLog || loopLog.length === 0) return null

  const lastEntry = loopLog[loopLog.length - 1]
  const isPerfect = lastEntry && lastEntry.score === lastEntry.total

  return (
    <section className={`story-section ${visible ? 'section-visible' : ''}`}>
      <div className="section-label">KARPATHY AUTORESEARCH</div>

      <p className="section-tagline">
        {running && !isPerfect
          ? 'Self-improving optimization in progress...'
          : isPerfect
            ? 'Perfect score achieved — all benchmark questions answered'
            : 'Iteratively optimizing until the agent succeeds'}
      </p>

      <div className="timeline">
        {loopLog.map((entry, i) => {
          const color = getNodeColor(entry.score, entry.total)
          const isExpanded = expandedNode === i
          const isLast = i === loopLog.length - 1

          return (
            <div key={i} className="timeline-step">
              <div
                className="timeline-node"
                style={{ borderColor: color, color }}
                onClick={() => setExpandedNode(isExpanded ? null : i)}
              >
                <div className="timeline-version">v{entry.version}</div>
                <div className="timeline-score">{entry.score}/{entry.total}</div>
              </div>

              {isExpanded && entry.failed_questions && entry.failed_questions.length > 0 && (
                <div className="timeline-details">
                  <div className="timeline-details-title">Failed questions:</div>
                  {entry.failed_questions.map((q, qi) => (
                    <div key={qi} className="timeline-failed-q">— {q}</div>
                  ))}
                </div>
              )}

              {!isLast && (
                <div className="timeline-connector">
                  <span className="timeline-arrow">→</span>
                </div>
              )}
            </div>
          )
        })}

        {running && !isPerfect && (
          <div className="timeline-step">
            <div className="timeline-connector">
              <span className="timeline-arrow">→</span>
            </div>
            <div className="timeline-node timeline-node-pending">
              <div className="spinner" style={{ width: 20, height: 20 }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default function ProblemSection({ rawScreenshot, rawAgentScore, visible, optimizeOnly }) {
  if (!visible) return null

  return (
    <section className={`story-section ${visible ? 'section-visible' : ''}`}>
      <div className="section-label">THE PROBLEM</div>

      <p className="section-tagline">
        {optimizeOnly
          ? 'Websites are bloated with noise. AI agents need clean, structured data.'
          : 'The web was built for humans. AI agents fail on it.'}
      </p>

      <div className="problem-iframe-wrapper">
        {rawScreenshot ? (
          <img
            src={`data:image/png;base64,${rawScreenshot}`}
            alt="Raw website screenshot"
            className="problem-screenshot"
          />
        ) : (
          <div className="problem-loading">
            <div className="spinner" />
            <p>Capturing website...</p>
          </div>
        )}
      </div>

      {!optimizeOnly && (
        <div className="problem-score">
          <div className="problem-score-number">{rawAgentScore ?? 0}/5</div>
          <div className="problem-score-label">Booking tasks completed by AI agent</div>
          <div className="problem-score-detail">An AI agent attempted 5 real booking steps on this unmodified website</div>
        </div>
      )}
    </section>
  )
}

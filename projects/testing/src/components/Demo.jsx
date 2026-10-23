/**
 * Card layout shared by every demo:
 *   header (title + concept) → controls (toggles) → stage (children) | event log
 */
export default function Demo({ title, concept, controls, log, children }) {
  return (
    <section className="demo">
      <header className="demo-header">
        <h2>{title}</h2>
        {concept && <p className="demo-concept">{concept}</p>}
      </header>

      {controls && <div className="demo-controls">{controls}</div>}

      <div className="demo-grid">
        <div className="demo-stage">{children}</div>
        {log}
      </div>
    </section>
  )
}

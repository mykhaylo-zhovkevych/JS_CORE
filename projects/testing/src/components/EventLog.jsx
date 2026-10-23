import { useEffect, useRef } from 'react'

export default function EventLog({ entries, onClear, title = 'Event log' }) {
  const listRef = useRef(null)

  // keep the newest entry in view
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [entries])

  return (
    <div className="event-log">
      <div className="event-log-header">
        <h3>{title}</h3>
        <button type="button" className="btn btn-small btn-ghost" onClick={onClear} disabled={entries.length === 0}>
          Clear
        </button>
      </div>
      <ol ref={listRef} className="event-log-list" aria-live="polite">
        {entries.length === 0 ? (
          <li className="event-log-empty">Interact with the demo — events show up here.</li>
        ) : (
          entries.map((entry) => (
            <li key={entry.id} className={`log-entry log-${entry.tone}`}>
              <time>{entry.time}</time>
              <span>{entry.message}</span>
            </li>
          ))
        )}
      </ol>
    </div>
  )
}

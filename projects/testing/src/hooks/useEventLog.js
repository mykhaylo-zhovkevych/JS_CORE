import { useCallback, useRef, useState } from 'react'

/**
 * Append-only log for the demos. Entries stay in chronological order so the
 * order in which handlers fire reads top to bottom.
 *
 * tone: 'info' | 'ok' | 'warn' | 'bug' | 'muted'
 */
export function useEventLog(limit = 40) {
  const [entries, setEntries] = useState([])
  const nextId = useRef(1)

  const log = useCallback(
    (message, tone = 'info') => {
      const entry = { id: nextId.current++, message, tone, time: timestamp() }
      setEntries((prev) => [...prev, entry].slice(-limit))
    },
    [limit],
  )

  const clear = useCallback(() => setEntries([]), [])

  return { entries, log, clear }
}

function timestamp() {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour12: false })
  return `${time}.${String(now.getMilliseconds()).padStart(3, '0')}`
}

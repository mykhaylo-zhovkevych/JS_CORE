import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'

// Evaluated once per page load — if this time changes, the page reloaded.
const PAGE_LOADED_AT = new Date().toLocaleTimeString([], { hour12: false })

function readNativeSubmit() {
  const params = new URLSearchParams(window.location.search)
  params.delete('_t')
  return params.size > 0 ? params.toString() : ''
}

export default function PreventDefaultDemo() {
  const [bug, setBug] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [nativeQuery, setNativeQuery] = useState(readNativeSubmit)
  const { entries, log, clear } = useEventLog()

  function handleSubmit(e) {
    const form = e.currentTarget

    if (bug) {
      // a unique value makes every submit a new URL, so the browser always does a full load
      form.elements.namedItem('_t').value = Date.now()
      log('no e.preventDefault() → browser submits the form and reloads the page…', 'bug')
      return
    }

    e.preventDefault()
    const data = new FormData(form)
    data.delete('_t')
    setSubmitted(Object.fromEntries(data))
    log(`e.preventDefault() → handled in JS: ${JSON.stringify(Object.fromEntries(data))}`, 'ok')
  }

  function handleCleanUrl() {
    window.history.replaceState(null, '', window.location.pathname + window.location.hash)
    setNativeQuery('')
  }

  return (
    <Demo
      title="preventDefault on form submit"
      concept="A form submit is a browser default action: it navigates and reloads the page. e.preventDefault() cancels it so React can handle the data."
      controls={
        <Toggle
          checked={bug}
          onChange={setBug}
          label="Bug: skip e.preventDefault()"
          hint="watch the load time and the log reset"
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <p className="stat">
        page loaded at <strong>{PAGE_LOADED_AT}</strong>
      </p>

      {nativeQuery && (
        <div className="callout callout-bug">
          <p>
            This page was loaded by a native form submit. The data ended up in the URL:
            <code>?{nativeQuery}</code> — and all React state (including the log) was lost.
          </p>
          <button type="button" className="btn btn-small" onClick={handleCleanUrl}>
            Clean URL
          </button>
        </div>
      )}

      <form className="stack" action="#event-object" method="get" onSubmit={handleSubmit}>
        <input type="hidden" name="_t" defaultValue="" />
        <label className="field">
          <span>Name</span>
          <input name="name" required placeholder="Ada" autoComplete="off" />
        </label>
        <label className="field">
          <span>Plan</span>
          <select name="plan" defaultValue="free">
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </form>

      {submitted && (
        <p className="stat">
          handled in React: <code>{JSON.stringify(submitted)}</code>
        </p>
      )}

      <Code variant={bug ? 'wrong' : 'right'}>
        {bug
          ? `
function handleSubmit(e) {
  // forgot e.preventDefault() → full page reload
  save(new FormData(e.currentTarget))
}
`
          : `
function handleSubmit(e) {
  e.preventDefault()
  save(new FormData(e.currentTarget))
}
`}
      </Code>
    </Demo>
  )
}

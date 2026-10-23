import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'

export default function PassReferenceDemo() {
  const [bug, setBug] = useState(false)
  const [clicks, setClicks] = useState(0)
  const { entries, log, clear } = useEventLog()

  function handleClick(e) {
    setClicks((c) => c + 1)
    log(`handleClick ran because of a "${e.type}" event`, 'ok')
  }

  // Stand-in for `handleClick()` in the buggy version. The real thing would call
  // setState while rendering and crash with "Too many re-renders", so this
  // version only reports to the console that it ran.
  function handleClickDuringRender() {
    console.info('[PassReferenceDemo] handler ran during render, not on click')
  }

  // onClick={fn}   → React receives the function and calls it later, on click.
  // onClick={fn()} → fn runs right now, React receives its return value.
  const onClick = bug ? handleClickDuringRender() : handleClick

  function handleBugChange(next) {
    setBug(next)
    log(
      next
        ? 'Switched to onClick={handleClick()} — the function now runs during render'
        : 'Switched back to onClick={handleClick}',
      next ? 'bug' : 'info',
    )
  }

  return (
    <Demo
      title="Pass a reference, not a call"
      concept="An event prop expects a function. Writing fn() calls it immediately while rendering and hands React the return value (usually undefined)."
      controls={
        <Toggle
          checked={bug}
          onChange={handleBugChange}
          label="Bug: onClick={handleClick()}"
          hint="call the handler instead of passing it"
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <div className="row">
        <button type="button" className="btn btn-primary" onClick={onClick}>
          Click me
        </button>
        <span className="stat">
          clicks handled: <strong>{clicks}</strong>
        </span>
      </div>

      <dl className="facts">
        <div className="fact">
          <dt>typeof onClick React received</dt>
          <dd className={typeof onClick === 'function' ? 'is-ok' : 'is-bug'}>{typeof onClick}</dd>
        </div>
        <div className="fact">
          <dt>handler runs</dt>
          <dd>{bug ? 'on every render (see DevTools console)' : 'on click'}</dd>
        </div>
      </dl>

      <Code variant="wrong" label="Wrong — runs on every render, click does nothing">{`
<button onClick={handleClick()}>Click me</button>
// with setState inside handleClick → "Too many re-renders"
`}</Code>
      <Code variant="right" label="Right — pass the function (or wrap it)">{`
<button onClick={handleClick}>Click me</button>
<button onClick={() => handleClick(id)}>Click me</button>
`}</Code>
    </Demo>
  )
}

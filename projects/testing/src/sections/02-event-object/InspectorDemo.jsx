import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'
import { describeElement } from '../../utils/describeElement.js'

const MODIFIERS = ['altKey', 'ctrlKey', 'shiftKey', 'metaKey']

export default function InspectorDemo() {
  const [bug, setBug] = useState(false)
  const [count, setCount] = useState(0)
  const [snapshot, setSnapshot] = useState(null)
  const { entries, log, clear } = useEventLog()

  function handleClick(e) {
    setCount((c) => c + 1)
    setSnapshot({
      'e.type': e.type,
      'e.target': describeElement(e.target),
      'e.currentTarget': describeElement(e.currentTarget),
      'e.clientX / clientY': `${Math.round(e.clientX)} / ${Math.round(e.clientY)}`,
      'e.detail': `${e.detail}${e.detail === 0 ? ' (keyboard "click")' : ''}`,
      modifiers: MODIFIERS.filter((key) => e[key]).join(' + ') || 'none',
      'e.nativeEvent': e.nativeEvent.constructor.name,
      'e.isTrusted': String(e.isTrusted),
    })
    log(`${e.type} · target ${describeElement(e.target)} · currentTarget ${describeElement(e.currentTarget)}`)

    if (bug) {
      // React resets e.currentTarget to null as soon as the handler returns.
      setTimeout(() => {
        log(
          `in setTimeout: e.currentTarget = ${describeElement(e.currentTarget)}, e.target = ${describeElement(e.target)}`,
          'bug',
        )
      }, 0)
    }
  }

  return (
    <Demo
      title="Inspecting the event object"
      concept="React passes a SyntheticEvent that wraps the browser event. target is the element you actually clicked, currentTarget is the element whose handler is running."
      controls={
        <Toggle
          checked={bug}
          onChange={setBug}
          label="Bug: read e.currentTarget later"
          hint="inside setTimeout — it's already null"
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <p className="hint">Click the text, then the badge. Try double/triple clicks and holding Shift/Alt/Ctrl.</p>
      <button type="button" className="btn btn-primary inspector-btn" onClick={handleClick}>
        Inbox
        <span className="badge" data-name="badge">
          {count}
        </span>
      </button>

      {snapshot && (
        <dl className="facts">
          {Object.entries(snapshot).map(([key, value]) => (
            <div key={key} className="fact">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {bug && (
        <Code variant="right" label="Fix — copy what you need before going async">{`
function handleClick(e) {
  const button = e.currentTarget
  setTimeout(() => button.blur(), 0)
}
`}</Code>
      )}
    </Demo>
  )
}

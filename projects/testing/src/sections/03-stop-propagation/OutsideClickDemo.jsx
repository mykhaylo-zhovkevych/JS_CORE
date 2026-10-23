import { useEffect, useRef, useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'

function Dropdown({ label, items, stopOnTrigger, useCapture, onTriggerClick, log }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleDocumentClick(e) {
      if (rootRef.current?.contains(e.target)) return
      log(`${label}: document listener saw an outside click → close`, 'ok')
      setOpen(false)
    }
    document.addEventListener('click', handleDocumentClick, useCapture)
    return () => document.removeEventListener('click', handleDocumentClick, useCapture)
  }, [open, useCapture, label, log])

  function handleTriggerClick(e) {
    onTriggerClick()
    if (stopOnTrigger) e.stopPropagation()
    setOpen((o) => !o)
  }

  function handleSelect(item) {
    log(`${label}: picked "${item}"`, 'info')
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="dropdown">
      <button
        type="button"
        className="btn"
        data-trigger
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleTriggerClick}
      >
        {label} ▾
      </button>
      {open && (
        <div className="dropdown-menu" role="menu">
          {items.map((item) => (
            <button key={item} type="button" role="menuitem" className="popover-item" onClick={() => handleSelect(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OutsideClickDemo() {
  const stageRef = useRef(null)
  const [bug, setBug] = useState(false)
  const [useCapture, setUseCapture] = useState(false)
  const [reactSaw, setReactSaw] = useState(0)
  const [documentSaw, setDocumentSaw] = useState(0)
  const { entries, log, clear } = useEventLog()

  // Counts trigger clicks that make it all the way up to document (bubble phase).
  useEffect(() => {
    function handleDocumentClick(e) {
      if (stageRef.current?.contains(e.target) && e.target.closest('[data-trigger]')) {
        setDocumentSaw((n) => n + 1)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  function handleTriggerClick() {
    setReactSaw((n) => n + 1)
  }

  function handleReset() {
    setReactSaw(0)
    setDocumentSaw(0)
  }

  const shared = { stopOnTrigger: bug, useCapture, onTriggerClick: handleTriggerClick, log }

  return (
    <Demo
      title="Outside click with a document listener"
      concept="Each open dropdown listens for clicks on document and closes when ref.contains(target) is false. React's listener sits on the root element, below document — so stopPropagation() in React also stops the native event before document sees it."
      controls={
        <>
          <Toggle
            checked={bug}
            onChange={setBug}
            label="Bug: stopPropagation() on the triggers"
            hint="open A, then click B — both stay open"
          />
          <Toggle
            checked={useCapture}
            onChange={setUseCapture}
            tone="fix"
            label="Fix: listen in the capture phase"
            hint="addEventListener('click', fn, true)"
          />
        </>
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <div ref={stageRef} className="dropdown-stage">
        <Dropdown label="Dropdown A" items={['Profile', 'Settings', 'Sign out']} {...shared} />
        <Dropdown label="Dropdown B" items={['Newest', 'Oldest', 'Popular']} {...shared} />
      </div>

      <div className="counters">
        <div className="counter">
          <span>React saw</span>
          <strong>{reactSaw}</strong>
          <small>trigger onClick calls</small>
        </div>
        <div className={`counter${documentSaw < reactSaw ? ' is-bug' : ''}`}>
          <span>document saw</span>
          <strong>{documentSaw}</strong>
          <small>trigger clicks reaching document (bubble)</small>
        </div>
        <button type="button" className="btn btn-small btn-ghost" onClick={handleReset}>
          Reset counters
        </button>
      </div>

      <Code variant={bug && !useCapture ? 'wrong' : 'right'}>{`
useEffect(() => {
  if (!open) return
  function onDocClick(e) {
    if (!ref.current.contains(e.target)) setOpen(false)
  }
  document.addEventListener('click', onDocClick${useCapture ? ', true' : ''})
  return () => document.removeEventListener('click', onDocClick${useCapture ? ', true' : ''})
}, [open])
`}</Code>
    </Demo>
  )
}

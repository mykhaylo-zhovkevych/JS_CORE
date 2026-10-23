import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import RadioGroup from '../../components/RadioGroup.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'
import { describeElement } from '../../utils/describeElement.js'

const STRATEGIES = [
  { value: 'stop', label: 'Panel calls e.stopPropagation()' },
  { value: 'target', label: 'Backdrop checks e.target === e.currentTarget' },
  { value: 'none', label: '🐞 No guard (bug)' },
]

const SNIPPETS = {
  stop: `
<div className="backdrop" onClick={close}>
  <div className="panel" onClick={(e) => e.stopPropagation()}>…</div>
</div>
`,
  target: `
<div className="backdrop" onClick={(e) => {
  if (e.target === e.currentTarget) close()
}}>
  <div className="panel">…</div>
</div>
`,
  none: `
<div className="backdrop" onClick={close}>
  <div className="panel">…</div>   {/* every click in here closes too */}
</div>
`,
}

function Modal({ onBackdropClick, onPanelClick, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose('Escape')
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <div className="modal-backdrop" data-name="backdrop" onClick={onBackdropClick}>
      <div className="modal-panel" data-name="panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onPanelClick}>
        <h3 id="modal-title">Rename project</h3>
        <p className="hint">Click the text field, the text, or the padding — then click the dark backdrop.</p>
        <label className="field">
          <span>Project name</span>
          <input defaultValue="events-playground" autoFocus />
        </label>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={() => onClose('Save button')}>
            Save
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onClose('Cancel button')}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function ModalDemo() {
  const [open, setOpen] = useState(false)
  const [strategy, setStrategy] = useState('stop')
  const { entries, log, clear } = useEventLog()

  function handleOpen() {
    setOpen(true)
    log('opened modal (portal into document.body)', 'muted')
  }

  function handleClose(reason) {
    setOpen(false)
    log(`closed by ${reason}`, 'info')
  }

  function handleBackdropClick(e) {
    const onBackdrop = e.target === e.currentTarget
    if (strategy === 'target' && !onBackdrop) {
      log(`backdrop onClick: target ${describeElement(e.target)} ≠ currentTarget → ignored`, 'ok')
      return
    }
    log(`backdrop onClick: target ${describeElement(e.target)} → close`, onBackdrop ? 'info' : 'bug')
    handleClose(onBackdrop ? 'backdrop click' : 'a click INSIDE the panel')
  }

  function handlePanelClick(e) {
    if (strategy !== 'stop') return
    e.stopPropagation()
    log('panel onClick: e.stopPropagation() → backdrop never hears it', 'ok')
  }

  return (
    <Demo
      title="Modal: close on backdrop click"
      concept="The panel sits inside the backdrop, so clicks on the panel bubble to the backdrop's onClick. Either stop them at the panel or ignore clicks whose target isn't the backdrop itself."
      controls={<RadioGroup legend="Strategy" options={STRATEGIES} value={strategy} onChange={setStrategy} />}
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <button type="button" className="btn btn-primary" onClick={handleOpen}>
        Open modal
      </button>
      {open && <Modal onBackdropClick={handleBackdropClick} onPanelClick={handlePanelClick} onClose={handleClose} />}

      <p className="hint">
        Trade-offs: stopPropagation also hides panel clicks from anything above (analytics, outside-click listeners).
        The target check has an edge case: press inside the panel, release on the backdrop — the click target is
        the backdrop, so it closes.
      </p>

      <Code variant={strategy === 'none' ? 'wrong' : 'right'}>{SNIPPETS[strategy]}</Code>
    </Demo>
  )
}

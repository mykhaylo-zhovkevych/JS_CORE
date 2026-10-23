import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'
import { describeElement } from '../../utils/describeElement.js'

const ACTIONS = ['Rename', 'Duplicate', 'Archive']

function Popover({ position, onAction, onClick, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    // a fixed-position popover would drift away from its trigger, so just close it.
    // Page scroll only: element scroll events (like the event log scrolling) don't bubble to window.
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', onClose)
    window.addEventListener('resize', onClose)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', onClose)
      window.removeEventListener('resize', onClose)
    }
  }, [onClose])

  return createPortal(
    <div className="popover" data-name="popover" role="menu" style={position} onClick={onClick}>
      <p className="popover-note">DOM parent: &lt;body&gt;</p>
      {ACTIONS.map((action) => (
        <button key={action} type="button" role="menuitem" className="popover-item" onClick={() => onAction(action)}>
          {action}
        </button>
      ))}
    </div>,
    document.body,
  )
}

export default function PortalBubblingDemo() {
  const cardRef = useRef(null)
  const [menuPosition, setMenuPosition] = useState(null)
  const [cardOpens, setCardOpens] = useState(0)
  const [bug, setBug] = useState(false)
  const { entries, log, clear } = useEventLog()

  function handleCardClick(e) {
    const inside = cardRef.current.contains(e.target)
    setCardOpens((n) => n + 1)
    log(
      `card onClick · target ${describeElement(e.target)} · card.contains(target) = ${inside}`,
      inside ? 'info' : 'bug',
    )
  }

  function handleTriggerClick(e) {
    // the trigger IS inside the card in the DOM, so it always needs to stop the click
    e.stopPropagation()
    if (menuPosition) {
      setMenuPosition(null)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPosition({ top: rect.bottom + 6, left: rect.right })
    log('⋯ opened popover via createPortal(…, document.body)', 'muted')
  }

  function handlePopoverClick(e) {
    if (bug) return
    e.stopPropagation()
  }

  function handleAction(action) {
    log(`popover action: ${action}`, 'ok')
    setMenuPosition(null)
  }

  return (
    <Demo
      title="Portals still bubble through React"
      concept="createPortal moves the DOM node to <body>, but React events bubble along the component tree. A click in the popover reaches the card's onClick even though the card doesn't contain it in the DOM."
      controls={
        <Toggle
          checked={bug}
          onChange={setBug}
          label="Bug: no stopPropagation on the popover"
          hint="pick an action from ⋯"
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <article ref={cardRef} className="project-card" data-name="card" onClick={handleCardClick}>
        <div>
          <h4>Project Apollo</h4>
          <p className="hint">Click the card to open it.</p>
        </div>
        <button
          type="button"
          className="btn btn-small btn-ghost"
          aria-haspopup="menu"
          aria-expanded={menuPosition !== null}
          onClick={handleTriggerClick}
        >
          ⋯
        </button>
        {menuPosition && (
          <Popover
            position={menuPosition}
            onAction={handleAction}
            onClick={handlePopoverClick}
            onClose={() => setMenuPosition(null)}
          />
        )}
      </article>
      <p className="stat">
        card opened <strong>{cardOpens}</strong> times
      </p>

      <Code variant={bug ? 'wrong' : 'right'}>{`
<article onClick={openCard}>
  {open && createPortal(
    <div className="popover"${bug ? '' : ' onClick={(e) => e.stopPropagation()}'}>…</div>,
    document.body,
  )}
</article>
// alternative guard in the card:
// if (!cardRef.current.contains(e.target)) return
`}</Code>
    </Demo>
  )
}

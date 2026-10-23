import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import RadioGroup from '../../components/RadioGroup.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'
import { describeElement } from '../../utils/describeElement.js'

// listed in the order React calls them for a click on "inner"
const STOP_POINTS = [
  { value: 'outer-capture', label: 'outer · onClickCapture' },
  { value: 'middle-capture', label: 'middle · onClickCapture' },
  { value: 'inner-capture', label: 'inner · onClickCapture' },
  { value: 'inner-bubble', label: 'inner · onClick' },
  { value: 'middle-bubble', label: 'middle · onClick' },
  { value: 'outer-bubble', label: 'outer · onClick' },
]

export default function PhasesDemo() {
  const [enabled, setEnabled] = useState(false)
  const [stopAt, setStopAt] = useState('inner-bubble')
  const { entries, log, clear } = useEventLog()

  function handlerFor(layer, phase) {
    return (e) => {
      // outer capture always runs first, so it starts a fresh trace for each click
      if (layer === 'outer' && phase === 'capture') {
        clear()
        log(`click on ${describeElement(e.target)}`, 'muted')
      }

      log(`${phase === 'capture' ? '↓ capture' : '↑ bubble'} · ${layer}`, phase === 'capture' ? 'info' : 'ok')

      if (enabled && stopAt === `${layer}-${phase}`) {
        e.stopPropagation()
        log(`⛔ e.stopPropagation() in ${layer} (${phase}) — no further handlers run`, 'bug')
      }
    }
  }

  const props = (layer) => ({
    'data-name': layer,
    className: `phase-box phase-${layer}${enabled && stopAt.startsWith(layer) ? ' is-stop' : ''}`,
    onClickCapture: handlerFor(layer, 'capture'),
    onClick: handlerFor(layer, 'bubble'),
  })

  return (
    <Demo
      title="Capture & bubble phases"
      concept="A click travels down from the root (capture: onClickCapture) to the target, then back up (bubble: onClick). stopPropagation() ends the trip wherever it is called."
      controls={
        <>
          <Toggle
            checked={enabled}
            onChange={setEnabled}
            label="Call e.stopPropagation()"
            hint="choose where below"
            tone="fix"
          />
          <RadioGroup
            legend="Stop in"
            options={STOP_POINTS}
            value={stopAt}
            onChange={setStopAt}
            disabled={!enabled}
          />
        </>
      }
      log={<EventLog entries={entries} onClear={clear} title="Handler order" />}
    >
      <div {...props('outer')}>
        <span className="phase-label">outer</span>
        <div {...props('middle')}>
          <span className="phase-label">middle</span>
          <button type="button" {...props('inner')}>
            inner
          </button>
        </div>
      </div>

      <Code>{`
<div onClickCapture={log} onClick={log}>          {/* outer  */}
  <div onClickCapture={log} onClick={log}>        {/* middle */}
    <button onClickCapture={log} onClick={log} /> {/* inner  */}
  </div>
</div>
// ↓ outer, middle, inner (capture) → ↑ inner, middle, outer (bubble)
`}</Code>
    </Demo>
  )
}

import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import RadioGroup from '../../components/RadioGroup.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'
import { describeElement } from '../../utils/describeElement.js'

const LANGUAGES = [
  { id: 'js', name: 'JavaScript', note: 'runs everywhere' },
  { id: 'ts', name: 'TypeScript', note: 'JavaScript with types' },
  { id: 'rs', name: 'Rust', note: 'no garbage collector' },
  { id: 'go', name: 'Go', note: 'goroutines & channels' },
]

const STRATEGIES = [
  { value: 'arrow', label: 'Arrow function: onClick={() => handleSelect(id)}' },
  { value: 'dataset', label: 'One handler: data-id + e.currentTarget.dataset.id' },
]

export default function PassArgumentsDemo() {
  const [strategy, setStrategy] = useState('arrow')
  const [bug, setBug] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const { entries, log, clear } = useEventLog()

  function handleSelect(id) {
    setSelectedId(id)
    log(`arrow function → handleSelect("${id}")`, 'ok')
  }

  // A single, stable handler shared by every item; the id travels in the DOM.
  function handleSelectFromDataset(e) {
    const source = bug ? e.target : e.currentTarget
    const id = source.dataset.id
    log(
      `${bug ? 'e.target' : 'e.currentTarget'} = ${describeElement(source)} → dataset.id = ${id === undefined ? 'undefined' : `"${id}"`}`,
      id ? 'ok' : 'bug',
    )
    setSelectedId(id ?? null)
  }

  const selected = LANGUAGES.find((lang) => lang.id === selectedId)

  return (
    <Demo
      title="Passing arguments to handlers"
      concept="Either close over the value with an arrow function, or store it in a data-* attribute and read it from e.currentTarget (the element the handler is attached to)."
      controls={
        <>
          <RadioGroup legend="Strategy" options={STRATEGIES} value={strategy} onChange={setStrategy} />
          <Toggle
            checked={bug}
            onChange={setBug}
            disabled={strategy !== 'dataset'}
            label="Bug: read e.target.dataset"
            hint="click on the bold name or the grey note"
          />
        </>
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <ul className="pick-list">
        {LANGUAGES.map((lang) => (
          <li key={lang.id}>
            <button
              type="button"
              className="pick-item"
              aria-pressed={lang.id === selectedId}
              data-id={lang.id}
              onClick={strategy === 'arrow' ? () => handleSelect(lang.id) : handleSelectFromDataset}
            >
              <strong>{lang.name}</strong>
              <small>{lang.note}</small>
            </button>
          </li>
        ))}
      </ul>
      <p className="stat">
        selected: <strong>{selected ? selected.name : '—'}</strong>
      </p>

      {strategy === 'arrow' ? (
        <Code>{`
{items.map((item) => (
  <button key={item.id} onClick={() => handleSelect(item.id)}>
    {item.name}
  </button>
))}
`}</Code>
      ) : (
        <Code variant={bug ? 'wrong' : 'right'}>{`
function handleSelect(e) {
  const id = e.${bug ? 'target' : 'currentTarget'}.dataset.id${bug ? '  // <strong> has no data-id!' : ''}
}

<button data-id={item.id} onClick={handleSelect}>
  <strong>{item.name}</strong> <small>{item.note}</small>
</button>
`}</Code>
      )}
    </Demo>
  )
}

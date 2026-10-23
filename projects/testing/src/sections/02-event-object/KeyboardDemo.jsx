import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'

export default function KeyboardDemo() {
  const [tags, setTags] = useState(['react', 'events'])
  const [text, setText] = useState('')
  const [bug, setBug] = useState(false)
  const { entries, log, clear } = useEventLog()

  function handleKey(e) {
    const value = e.currentTarget.value
    log(`${e.type} · key "${e.key}" · code ${e.code}${e.repeat ? ' · repeat' : ''} · value "${value}"`, 'muted')

    if (e.key === 'Enter') {
      // Enter that confirms an IME composition (Japanese, Chinese, …) is not "submit"
      if (e.nativeEvent.isComposing) return
      e.preventDefault()
      const tag = value.trim().toLowerCase()
      if (!tag) return
      setText('')
      if (tags.includes(tag)) {
        log(`"${tag}" already exists`, 'warn')
        return
      }
      setTags([...tags, tag])
      log(`Enter → added "${tag}"`, 'ok')
    } else if (e.key === 'Backspace' && value === '' && tags.length > 0) {
      setTags(tags.slice(0, -1))
      log(`Backspace on empty input → removed "${tags.at(-1)}"`, bug ? 'bug' : 'ok')
    } else if (e.key === 'Escape') {
      if (value) {
        setText('')
        log('Escape → cleared the input', 'ok')
      } else if (tags.length > 0) {
        setTags([])
        log('Escape on empty input → removed all tags', 'ok')
      }
    }
  }

  function handleRemove(tag) {
    setTags(tags.filter((t) => t !== tag))
    log(`× → removed "${tag}"`, 'info')
  }

  const keyProps = bug ? { onKeyUp: handleKey } : { onKeyDown: handleKey }

  return (
    <Demo
      title="Keyboard events"
      concept="Use e.key for what the key means (Enter, Escape, a). keydown fires before the input changes, keyup after — that difference matters."
      controls={
        <Toggle
          checked={bug}
          onChange={setBug}
          label="Bug: handle onKeyUp instead of onKeyDown"
          hint='type "ab", then Backspace twice'
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <p className="hint">Enter adds · Backspace on an empty input removes the last tag · Escape clears the text, then all tags.</p>
      <div className="tag-input">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button type="button" aria-label={`Remove ${tag}`} onClick={() => handleRemove(tag)}>
              ×
            </button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          {...keyProps}
          placeholder="add a tag…"
          aria-label="New tag"
        />
      </div>

      <Code variant={bug ? 'wrong' : 'right'}>
        {bug
          ? `
<input onKeyUp={handleKey} />
// keyup runs AFTER the last character was deleted,
// so value === '' is already true → a tag disappears too
`
          : `
<input onKeyDown={(e) => {
  if (e.key === 'Enter') addTag()
  if (e.key === 'Backspace' && e.currentTarget.value === '') removeLast()
  if (e.key === 'Escape') clear()
}} />
`}
      </Code>
    </Demo>
  )
}

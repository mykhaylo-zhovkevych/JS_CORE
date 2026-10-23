import { useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'

const INITIAL_TASKS = [
  { id: 1, title: 'Read about SyntheticEvent', notes: 'React wraps native events in one cross-browser object.', done: true },
  { id: 2, title: 'Try capture vs bubble', notes: 'onClickCapture runs on the way down, onClick on the way up.', done: false },
  { id: 3, title: 'Fix the clickable row', notes: 'Controls inside a clickable row must not trigger the row.', done: false },
]

export default function ClickableRowDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [openId, setOpenId] = useState(null)
  const [bug, setBug] = useState(false)
  const { entries, log, clear } = useEventLog()

  // Called first by the inner control; decides whether the row hears the click.
  function guard(e, what) {
    if (bug) {
      log(`${what}: no stopPropagation → the click bubbles on to the row`, 'bug')
      return
    }
    e.stopPropagation()
    log(`${what}: e.stopPropagation() → row handler skipped`, 'ok')
  }

  function handleOpen(task) {
    setOpenId(task.id)
    log(`row onClick → opened "${task.title}"`, 'info')
  }

  function handleRowKeyDown(e, task) {
    // ignore keys that bubbled up from the checkbox / delete button
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen(task)
    }
  }

  function handleToggleDone(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function handleDelete(e, task) {
    guard(e, 'Delete')
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
    log(`deleted "${task.title}"`, 'info')
  }

  const openTask = tasks.find((t) => t.id === openId)

  return (
    <Demo
      title="Clickable rows with controls inside"
      concept="The whole row opens the details. The checkbox and Delete button live inside the row, so their clicks bubble to it — unless they stop propagation."
      controls={
        <Toggle
          checked={bug}
          onChange={setBug}
          label="Bug: no stopPropagation on inner controls"
          hint="tick a checkbox or delete a task"
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-row${task.id === openId ? ' is-open' : ''}${task.done ? ' is-done' : ''}`}
            tabIndex={0}
            onClick={() => handleOpen(task)}
            onKeyDown={(e) => handleRowKeyDown(e, task)}
          >
            <input
              type="checkbox"
              checked={task.done}
              aria-label={`Mark "${task.title}" as done`}
              onClick={(e) => guard(e, 'checkbox')}
              onChange={() => handleToggleDone(task.id)}
            />
            <span className="task-title">{task.title}</span>
            <button type="button" className="btn btn-small btn-danger" onClick={(e) => handleDelete(e, task)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && (
        <button type="button" className="btn btn-small btn-ghost" onClick={() => setTasks(INITIAL_TASKS)}>
          Restore tasks
        </button>
      )}

      <div className="details" aria-live="polite">
        {openId === null && <p className="hint">No task open.</p>}
        {openId !== null && !openTask && (
          <p className="is-bug">⚠ The row opened a task that was just deleted — the Delete click bubbled to the row.</p>
        )}
        {openTask && (
          <>
            <h4>{openTask.title}</h4>
            <p>{openTask.notes}</p>
            <button type="button" className="btn btn-small btn-ghost" onClick={() => setOpenId(null)}>
              Close
            </button>
          </>
        )}
      </div>

      <Code variant={bug ? 'wrong' : 'right'}>{`
<li onClick={() => open(task)}>
  <input type="checkbox" onClick={(e) => e.stopPropagation()} … />
  <button onClick={(e) => { ${bug ? '' : 'e.stopPropagation(); '}remove(task) }}>Delete</button>
</li>
`}</Code>
    </Demo>
  )
}

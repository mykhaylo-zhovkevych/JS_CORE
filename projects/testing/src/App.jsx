import HandleClickSection from './sections/01-handle-click/index.jsx'
import EventObjectSection from './sections/02-event-object/index.jsx'
import StopPropagationSection from './sections/03-stop-propagation/index.jsx'
import { useHashTab } from './hooks/useHashTab.js'
import { useTheme } from './hooks/useTheme.js'

const TABS = [
  {
    id: 'handle-click',
    label: 'Handling clicks',
    intro: 'Passing handlers, passing arguments, and handlers as props.',
    Section: HandleClickSection,
  },
  {
    id: 'event-object',
    label: 'The event object',
    intro: 'What React hands your handler: target vs currentTarget, default actions, keys.',
    Section: EventObjectSection,
  },
  {
    id: 'stop-propagation',
    label: 'Propagation',
    intro: 'Capture and bubble, stopPropagation, portals and document listeners.',
    Section: StopPropagationSection,
  },
]

const TAB_IDS = TABS.map((tab) => tab.id)

function App() {
  const activeId = useHashTab(TAB_IDS)
  const { theme, toggle } = useTheme()
  const active = TABS.find((tab) => tab.id === activeId)
  const { Section } = active

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>React Events Playground</h1>
          <p className="app-subtitle">Every demo has a bug toggle — flip it and watch the event log.</p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={toggle} aria-label="Toggle color theme">
          {theme === 'dark' ? '☀ Light' : '☾ Dark'}
        </button>
      </header>

      <nav className="tabs" aria-label="Sections">
        {TABS.map((tab, index) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className="tab"
            aria-current={tab.id === activeId ? 'page' : undefined}
          >
            <span className="tab-number">{String(index + 1).padStart(2, '0')}</span>
            {tab.label}
          </a>
        ))}
      </nav>

      <main className="section">
        <p className="section-intro">{active.intro}</p>
        {/* key resets every demo's state when switching tabs */}
        <Section key={active.id} />
      </main>
    </div>
  )
}

export default App

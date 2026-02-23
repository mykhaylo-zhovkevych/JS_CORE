import { useState } from 'react'
import './App.css'
import UseStateDemo from "./demos/UseStateDemo.jsx";
import UseEffectDemo from "./demos/UseEffectDemo.jsx";
import UseRefDemo from "./demos/UseRefDemo.jsx";

const TABS = [
  {id: "state", label: "useState",view: <UseStateDemo  />},
  {id: "effect", label: "useEffect", view: <UseEffectDemo />},
  {id: "ref", label: "useRef", view: <UseRefDemo />},
  // {id: "composition", label: "CompositionVsInheritance", view: <CompositionVsInheritance />},
];


export default function App() {
  const [active, setActive] = useState(TABS[0].id);
  const activeTab = TABS.find((t) => t.id === active);

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>
            React 4 
          </h1>
          <p className="muted">
            Focus: <code>useState</code>, <code>useEffect</code>, <code>useRef</code>, <code>CompositionVsInheritance</code>
          </p>
        </div>

        <nav className="tabs" aria-label="Navigation">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${t.id === active ? "active" : ""}`}
              onClick={() => setActive(t.id)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        <section className="card">{activeTab?.view}</section>
      </main>

    </div>
  )
}

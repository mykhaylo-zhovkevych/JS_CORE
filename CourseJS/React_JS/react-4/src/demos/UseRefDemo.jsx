import { useEffect, useRef, useState } from "react";

export default function UseRefDemo() {
  const inputRef = useRef(null);

  const clicksRef = useRef(0);

  // State only for display purposes
  // Stores a snapshot of that ref value
  const [renders, setRenders] = useState(0);
  const [clicksShown, setClicksShown] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Won't re-render when I update clicksRef.current, but it will keep the value across renders
  function incrementRefOnly() {
    clicksRef.current += 1;
  }

  function forceRerender() {
    // Re-render only to prove re-render doesn't automatically sync ref into UI
    setClicksShown(clicksRef.current);
    setRenders((r) => r + 1);
  }

  function syncSnapshot() {
    // Bring snapshot into the UI (copy ref -> state)
    // Will skip if the value is the same, but will rerender if the value is different
    setClicksShown(clicksRef.current);
  }

  function resetRef() {
    clicksRef.current = 0;
    setClicksShown(0);
    setRenders((r) => r + 1);
  }

  return (
    <div>
      <h2>useRef</h2>

      <div className="grid">
        <div className="panel">
          <h3>1) DOM Ref: Focus input</h3>
          <input
            ref={inputRef}
            type="text"
            placeholder="I am focused on start…"
          />
          <div className="row">
            <button
              className="btn primary"
              onClick={() => inputRef.current?.focus()}
              type="button"
            >
              Focus()
            </button>
            <button
              className="btn"
              onClick={() => inputRef.current?.select()}
              type="button"
            >
              Select()
            </button>
          </div>
        </div>

        <div className="panel">
          <h3>2) Mutable value without re-render</h3>

          <div className="kv">
            <div className="muted">clicksRef.current (Snapshot)</div>
            <div>
              <strong>{clicksShown}</strong>
            </div>

            <div className="muted">Re-renders (State)</div>
            <div>
              <strong>{renders}</strong>
            </div>
          </div>

          <div className="row">
            <button className="btn" onClick={incrementRefOnly} type="button">
              Ref +1 (no re-render)
            </button>

            <button className="btn" onClick={syncSnapshot} type="button">
              Sync Snapshot (show ref)
            </button>

            <button
              className="btn primary"
              onClick={forceRerender}
              type="button"
            >
              Force Re-Render (State)
            </button>

            <button className="btn" onClick={resetRef} type="button">
              Reset Ref
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
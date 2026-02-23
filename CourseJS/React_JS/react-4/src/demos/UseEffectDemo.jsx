import { useEffect, useState } from "react";

export default function UseEffectDemo() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    // Effect 1: synchronize document.title (dependency: seconds)
    useEffect(() => {
        document.title = `Seconds: ${seconds}`;
    }, [seconds]);
    // [seconds] and [isRunning] are the dependency arrays
    // Run then again only if dep changed since last render

    // Effect 2: start/stop timer + cleanup
    useEffect(() => {
        if (!isRunning) return;

        //console.log("[useEffect] Timer start");
        const id = window.setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);

        return () => {
            //console.log("[useEffect] Timer stop");
            window.clearInterval(id); ; // cleanup
        };
    }, [isRunning]);

return (
    <div>
      <h2>useEffect</h2>
      <p className="muted">
        <code>useEffect</code> runs after rendering and keeps your component in sync with
        “external systems” (timers, events, network, DOM APIs). Important: <strong>Dependencies</strong> and <strong>Cleanup</strong>.
      </p>

    <div className="grid">
        <div className="panel">
          <h3>1) Timer with Cleanup</h3>

          <div className="kv">
            <div className="muted">isRunning</div>
            <div><code>{String(isRunning)}</code></div>

            <div className="muted">seconds</div>
            <div><strong>{seconds}</strong></div>
          </div>

        <div className="row">
            <button
              className={`btn ${isRunning ? "" : "primary"}`}
              onClick={() => setIsRunning(true)}
              type="button"
              disabled={isRunning}
            >
              Start
            </button>

            <button
              className={`btn ${isRunning ? "danger" : ""}`}
              onClick={() => setIsRunning(false)}
              type="button"
              disabled={!isRunning}
            >
              Stop
            </button>

            <button className="btn" onClick={() => setSeconds(0)} type="button">
                Reset Seconds
            </button>
        </div>

            <div className="panel">
            <h3>2) Dependency Array (“Dependencies”)</h3>
            <p className="muted">
                The effect above has <code>[isRunning]</code>. That means:
            </p>
            <ul className="muted" style={{ marginTop: 8 }}>
                <li>It runs on the first render.</li>
                <li>It runs again when <code>isRunning</code> changes.</li>
                <li>Before it runs again, the cleanup function is executed .</li>
            </ul>

            <p className="muted" style={{ marginTop: 10 }}>
                Common mistake: wrong/missing dependencies "stale values" or infinite loops.
            </p>
            </div>

        </div>

    </div>
</div>

)

}
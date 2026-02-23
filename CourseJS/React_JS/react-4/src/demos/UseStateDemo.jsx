import { useState } from "react";   

export default function UseStateDemo() {
    // useState = component memory
    // When I call setState, the component is re-rendered
    const [count, setCount] = useState(0);

    // Controlled input field
    const [name, setName] = useState("");

    // Classic: "stale state" / batching with multiple updates
    // -> the safe way is the "functional update": setCount(c => c + 1)
    function addThreeWrong() {
        // This can be surprising: all three read the same count value
        // so it often ends up being only +1 instead of +3
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

    function addThreeRight() {
        // Functional update: React gives me the current value (c)
        // Three updates -> +3 guaranteed
        setCount((c) => c + 1);
        setCount((c) => c + 1);
        setCount((c) => c + 1);
    }

    return (
        <div>
            <h2>
                useState
            </h2>
            <p className="muted">
                <code>useState</code> stores local state in a functional component.
                With <code>setState</code>, React re-renders.
            </p>

            <div className="grid">
                <div className="panel">
                <h3>1) Counter (State to UI)</h3>
                <div className="kv">
                    <div className="muted">count</div>
                    <div><strong>{count}</strong></div>
                </div>

                <div className="row">
                    <button className="btn" onClick={() => setCount((c) => c - 1)} type="button">-1</button>
                    <button className="btn primary" onClick={() => setCount((c) => c + 1)} type="button">+1</button>
                    <button className="btn" onClick={() => setCount(0)} type="button">Reset</button>
                </div>

                    <div className="row">
                        <button className="btn danger" onClick={addThreeWrong} type="button">+3 (wrong)</button>
                        <button className="btn primary" onClick={addThreeRight} type="button">+3 (right)</button>
                    </div>

                </div>

                <div className="panel">
                    <h3>2) Controlled input field</h3>
                    <p className="muted">
                        “Controlled component”: The input value comes from state and is updated via <code>onChange</code>.
                    </p>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name…"
                    />

                    <div className="kv">
                        <div className="muted">State</div>
                        <div><code>{JSON.stringify(name)}</code></div>
                    </div>

                    <p className="muted" style={{ marginTop: 10 }}>
                        Advantage: I can validate, format, save, etc. – all through state.
                    </p>
                </div>
            </div>
        </div>
    )

}
# React Events Playground

A learning playground for React 19 event handling, built with Vite (plain JSX).
Three tabs, one folder each. Every demo has a **bug toggle** (or strategy picker)
and an **event log**, so you can break the code on purpose and watch what changes.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # oxlint
npm run build
```

The active tab lives in the URL hash (`#handle-click`, `#event-object`,
`#stop-propagation`), so links and reloads keep your place. Light/dark mode
follows the OS and can be toggled in the header.

## Structure

```
src/
├── App.jsx                     tabs (hash-based) + theme toggle
├── index.css                   CSS variables for light/dark + all styles
├── components/
│   ├── Demo.jsx                card layout: title, concept, controls, stage (children), log
│   ├── EventLog.jsx            chronological log with tones (ok / bug / warn / info / muted)
│   ├── Toggle.jsx              switch for bug / fix toggles
│   ├── RadioGroup.jsx          strategy pickers
│   └── Code.jsx                static code snippets (neutral / wrong / right)
├── hooks/
│   ├── useEventLog.js          { entries, log(message, tone), clear }
│   ├── useHashTab.js           active tab from location.hash (useSyncExternalStore)
│   └── useTheme.js             light/dark override stored in localStorage
├── utils/
│   └── describeElement.js      <button.btn>, <span.badge[badge]> … for log output
└── sections/
    ├── 01-handle-click/
    │   ├── PassReferenceDemo   onClick={fn} vs onClick={fn()}
    │   ├── PassArgumentsDemo   arrow function vs data-id + e.currentTarget.dataset
    │   └── HandlerPropsDemo    PostCard onLike → parent handleLike, immutable update
    ├── 02-event-object/
    │   ├── InspectorDemo       type, target vs currentTarget, clientX/Y, detail, modifiers, nativeEvent
    │   ├── PreventDefaultDemo  form submit with / without preventDefault (real reload)
    │   └── KeyboardDemo        tag input: Enter, Backspace on empty, Escape (e.key)
    └── 03-stop-propagation/
        ├── PhasesDemo          capture/bubble order, stopPropagation at any point
        ├── ClickableRowDemo    checkbox + Delete inside a clickable row
        ├── ModalDemo           backdrop close: stopPropagation / target check / none
        ├── PortalBubblingDemo  portal popover still bubbles to the card
        └── OutsideClickDemo    document listener + ref.contains vs stopPropagation
```

## What each bug toggle shows

| Demo | Toggle on → |
| --- | --- |
| PassReference | `onClick={handleClick()}` — React receives `undefined`, the handler runs on render |
| PassArguments | reads `e.target.dataset` — clicking the inner `<strong>` gives `undefined` |
| HandlerProps | `post.likes++; setPosts(posts)` — same reference, no re-render |
| Inspector | reads `e.currentTarget` in `setTimeout` — it's `null` by then |
| PreventDefault | no `preventDefault()` — the page reloads, data lands in the URL, state is gone |
| Keyboard | `onKeyUp` instead of `onKeyDown` — deleting the last letter also deletes a tag |
| Phases | choose where `stopPropagation()` is called and see which handlers never run |
| ClickableRow | inner controls don't stop the click — the row opens (even for a deleted task) |
| Modal | "No guard" — clicking inside the panel closes the modal |
| PortalBubbling | popover doesn't stop the click — the card opens, `card.contains(target) === false` |
| OutsideClick | triggers call `stopPropagation()` — document never sees it, two menus stay open |

## Cheat sheet

### Attaching handlers

```jsx
<button onClick={handleClick}>              // ✅ pass the function
<button onClick={() => handleClick(id)}>    // ✅ wrap it to pass arguments
<button onClick={handleClick()}>            // ❌ calls it during render
```

- Name props `onSomething`, handlers `handleSomething`.
- A handler prop is just a function prop: `<PostCard onLike={handleLike} />`.
- State updates must create new objects/arrays: `prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p)`.

### The event object (SyntheticEvent)

| Property | Meaning |
| --- | --- |
| `e.type` | `"click"`, `"keydown"`, `"submit"` … |
| `e.target` | the element the event started on (can be a child) |
| `e.currentTarget` | the element whose handler is running — **null after the handler returns** |
| `e.clientX / clientY` | pointer position in the viewport |
| `e.detail` | click count (1, 2, 3 …); `0` for keyboard-triggered clicks |
| `e.altKey` `ctrlKey` `shiftKey` `metaKey` | modifier keys held |
| `e.key` / `e.code` | what the key means (`"Enter"`, `"a"`) / physical key (`"KeyA"`) |
| `e.nativeEvent` | the underlying browser event (`PointerEvent`, `KeyboardEvent` …) |
| `e.preventDefault()` | cancel the browser's default action (submit, link navigation, checkbox toggle) |
| `e.stopPropagation()` | stop the event from reaching handlers further up (or down, in capture) |

Prefer `e.currentTarget` for reading `dataset`/`value` from the element you attached to.
Copy anything you need **before** `await`/`setTimeout`.

### Propagation

```
click on <inner>
  ↓ outer onClickCapture
  ↓ middle onClickCapture
  ↓ inner onClickCapture
  ↑ inner onClick
  ↑ middle onClick
  ↑ outer onClick
```

- `stopPropagation()` ends the trip right where it's called — in capture or bubble.
- `preventDefault()` and `stopPropagation()` are independent.
- **Portals** bubble along the React tree, not the DOM tree: a click in a portal
  reaches React ancestors even though `ancestor.contains(target)` is `false`.
- React listens on the **root element**. `stopPropagation()` in a React handler
  also stops the native event before it reaches `document` / `window` listeners.
  Outside-click listeners should therefore use the capture phase
  (`addEventListener('click', fn, true)`) or avoid `stopPropagation` upstream.

### Common patterns

```jsx
// Clickable row with controls inside
<li onClick={open}>
  <input type="checkbox" onClick={(e) => e.stopPropagation()} onChange={toggle} />
  <button onClick={(e) => { e.stopPropagation(); remove() }}>Delete</button>
</li>

// Modal backdrop
<div className="backdrop" onClick={(e) => e.target === e.currentTarget && close()}>
  <div className="panel">…</div>
</div>

// Outside click
useEffect(() => {
  if (!open) return
  const onDocClick = (e) => { if (!ref.current.contains(e.target)) setOpen(false) }
  document.addEventListener('click', onDocClick, true)
  return () => document.removeEventListener('click', onDocClick, true)
}, [open])

// Keys
onKeyDown={(e) => {
  if (e.key === 'Enter' && !e.nativeEvent.isComposing) submit()
  if (e.key === 'Escape') cancel()
}}

// Forms
function handleSubmit(e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget))
}
```

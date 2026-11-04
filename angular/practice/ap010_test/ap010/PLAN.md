# ap010 – Mini UI Kit / Style Playground

One page that shows a small set of your own UI components and directives, each in a few
variants. The point is not the components themselves, but to make chapters **21 (host
bindings & listeners)** and **22 (styling & encapsulation)** visible and testable in DevTools.

---

## 1. Prerequisites – what you already know and where you used it

Nothing here is new, but the UI kit leans on all of it. If one of these feels shaky,
look at the listed app first.

| Feature | Needed for | Where you used it |
| --- | --- | --- |
| Standalone components, `imports: [...]` | every component | all apps |
| `signal()` / `computed()` | open/closed state, active tab, theme | ap03, ap09 (`random-api.ts`, `panel.ts`) |
| `effect()` | syncing the theme class onto `<html>` | ap09 (`dashboard-page.ts`, `value-bars.ts`) |
| `input()` / `input.required()` | button variant, tooltip text, highlight colour | ap05 `ttt-compare/modern`, ap09 |
| `output()` | `(clickOutside)`, `(closed)` of the modal | ap05 `ttt-compare/modern` |
| `model()` / `[( )]` | `[(open)]` on dropdown and modal, `[(active)]` on tabs | ap09 (`side-nav.ts`) |
| `@if` / `@for` / `@switch` | variants, tab bodies, lists of demos | ap01 → ap09 |
| `<ng-content select>` + fallback content | card header/body/footer slots | ap09 (`shell.ts`, `panel.ts`) |
| `contentChildren()` | tabs finding their `<ui-tab>`s | ap09 (`side-nav.ts`) |
| `inject(ParentComponent)` | `<ui-tab>` talking to `<ui-tabs>` | ap09 (`NavItem` → `SideNav`) |
| `inject(ElementRef)` + `.nativeElement` | click-outside: "was the click inside me?" | ap09 (`panel.ts`) |
| Marker `@Directive` (no logic) | – now you give directives real behaviour | ap09 (`ShellAside`, `PanelActions`) |
| `host: { ... }` metadata (first glimpse) | **this is chapter 21.1/21.2** | ap09 (`top-bar.ts`, `panel.ts` `'[attr.id]'`) |
| `:host` (basic) | component's own box | ap09 (`shell.ts`, `panel.ts`) |
| CSS variables in `styles.css` | theme tokens, styling children without `::ng-deep` | ap09 (`styles.css`) |

Not needed: `HttpClient`, reactive forms, routing (one page is enough; a `ngModel` on a
checkbox or two in the playground controls is optional).

---

## 2. New topics and where each one shows up

| # | Topic | Lives in |
| --- | --- | --- |
| 21.1 | Host bindings: `host: { '[class.x]', '[style.x]', '[attr.x]' }` | `ui-button`, `appHighlight`, `appTooltip` |
| 21.2 | Host listeners: `host: { '(mouseenter)', '(document:click)', '(window:...)' }` | `appTooltip`, `appClickOutside`, `ui-modal` |
| 21.3 | Directive that changes colour on hover | `appHighlight` |
| 22.1 | Global styles (`styles.scss`, `styles` in `angular.json`) | reset, font, tokens, themes, tooltip CSS |
| 22.2 | `ViewEncapsulation.Emulated` / `None` / `ShadowDom` | three versions of `ui-card` |
| 22.3 | `_ngcontent` / `_nghost` attributes, `::ng-deep` vs CSS variables | encapsulation lab section |
| 22.4 | `:host`, `:host(.variant)`, `:host-context(.dark)` | `ui-button`, `ui-card`, `ui-badge` |

---

## 3. What the app must have

### 3.1 Global styles (22.1)
- [ ] Switch `styles.css` → `styles.scss` and check the `styles` entry in `angular.json`.
- [ ] Small reset (`box-sizing`, margins, font).
- [ ] Design tokens as CSS variables on `:root` (`--surface`, `--accent`, `--radius`, …).
- [ ] Two themes: `.light` / `.dark` class on `<html>`, toggled from the playground header.
- [ ] Tooltip CSS lives here – **directives have no `styles`**, so anything a directive
      needs visually must be global (or come from the component it sits on).

### 3.2 Components
- [ ] **`ui-button`** – variants `primary | ghost | danger`, sizes `sm | md`.
      Variant is set with a host binding (`'[class.primary]': "variant() === 'primary'"`),
      styled with `:host(.primary)`. Dark-mode tweak with `:host-context(.dark)`. (21.1, 22.4)
- [ ] **`ui-badge`** – tiny pill, colour from an input via `'[style.--badge-color]'`. (21.1)
- [ ] **`ui-card`** – slots `[cardHeader]`, default body, `[cardFooter]` with fallback text.
      Built **three times** with `Emulated`, `None`, `ShadowDom` and shown side by side,
      each with the same `h3 { color: red }` rule to watch it leak or stay sealed. (22.2)
- [ ] **`ui-tabs` + `ui-tab`** – `contentChildren(Tab)`, tab injects its parent, `[(active)]`.
      The tab body is the target of the `::ng-deep` vs CSS-variable experiment. (22.3)
- [ ] **`ui-dropdown`** – `[(open)]`, closes when clicking outside (uses `appClickOutside`).
- [ ] **`ui-modal`** – `[(open)]`, closes on backdrop click and on
      `'(document:keydown.escape)'`. (21.2 with `document`)

### 3.3 Directives
- [ ] **`appHighlight`** – `input` colour, `(mouseenter)` / `(mouseleave)` on the host,
      `'[style.backgroundColor]'` bound to a signal. The classic 21.3 example.
- [ ] **`appTooltip`** – `'[attr.data-tooltip]'`, `'[class.tooltip-open]'`; opens on
      `mouseenter` / `focus`, closes on `mouseleave` / `blur`. Rendering via global CSS
      (`::after { content: attr(data-tooltip) }`), no DOM created by hand.
- [ ] **`appClickOutside`** – `'(document:click)': 'onDocClick($event)'`, emits
      `clickOutside` when `!host.nativeElement.contains(event.target)`.
- [ ] **`appBreakpoint`** (optional) – `'(window:resize)'` toggles `[class.compact]`
      on the host below 600px.

### 3.4 Encapsulation lab (22.3)
- [ ] A section with short instructions: open DevTools, find `_nghost-xxx` on a component
      and `_ngcontent-xxx` on its elements, read the rewritten selector in the `<style>` tag.
- [ ] Try to restyle the tab body from the parent with a normal selector (doesn't work),
      then with `::ng-deep` (works, deprecated), then with a CSS variable the child
      exposes (the recommended way).

### 3.5 Playground shell
- [ ] Header with theme toggle and app title.
- [ ] One section per component/directive, each with a heading, a short "what to look at"
      line and the live demo.

---

## 4. Out of scope
- No backend, no HTTP, no routing, no forms library.
- No accessibility polish beyond basics (focus for tooltip, Escape for modal).
- No animations library – plain CSS transitions are enough.

## 5. Suggested build order
1. Scaffold `ap010`, switch to SCSS, write global styles and the theme toggle.
2. `appHighlight` – smallest possible host binding/listener example.
3. `ui-button` + `ui-badge` – host classes, `:host(.x)`, `:host-context(.dark)`.
4. `appTooltip` – host attributes + global CSS.
5. `ui-card` ×3 – encapsulation modes.
6. `ui-tabs` – then the `::ng-deep` / CSS-variable lab.
7. `appClickOutside` → `ui-dropdown`, then `ui-modal` with Escape.

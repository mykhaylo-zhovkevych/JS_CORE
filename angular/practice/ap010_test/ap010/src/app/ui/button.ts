import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

// An ATTRIBUTE selector on a native <button> instead of a new <ui-button> tag:
// the host element IS the real <button>, so type="submit", disabled, focus, keyboard
// handling and accessibility all keep working for free. The component only adds
// classes to it and styles itself with :host.
@Component({
  selector: 'button[uiButton], a[uiButton]',
  template: `<ng-content />`,
  host: {
    class: 'ui-button',

    //  A plain .primary would never match the button, because of how Angular rewrites component styles by default (Emulated encapsulation)
    '[class.primary]': 'variant() === "primary"',
    '[class.ghost]': 'variant() === "ghost"',
    '[class.danger]': 'variant() === "danger"',
    '[class.sm]': 'size() === "sm"',
  },
  styles: `
    /* 22.4 - :host = the component's own element, here the <button> itself.
       After compilation this becomes [_nghost-xxx], so it only hits buttons that
       really are this component, not every <button> on the page. */
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      color: var(--text);
      font: inherit;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 120ms, border-color 120ms;
    }
    :host(:hover) { background: var(--hover); }
    :host(:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }

    /* 22.4 - :host(selector) matches the host only when it ALSO matches the selector.
       The classes come from the host bindings above. Note the parentheses: writing
       ':host .primary' would mean "a .primary element INSIDE the host" instead. */
    :host(.primary) {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--accent-contrast);
    }
    :host(.primary:hover) { filter: brightness(1.1); }

    :host(.ghost) { background: transparent; border-color: transparent; }
    :host(.ghost:hover) { background: var(--hover); }

    :host(.danger) { border-color: var(--danger); color: var(--danger); }
    :host(.sm) { padding: 4px 10px; font-size: 0.85rem; }


    :host-context(.dark) {
      border-color: color-mix(in srgb, var(--border) 60%, white);
    }
    /* To combine "dark ancestor" AND "host has .primary", put the class directly after
       :host-context(...). Compiled:  .dark .primary[_nghost-xxx]
       Careful: ':host-context(.dark):host(.primary)' looks right but compiles to
       .dark.primary[_nghost-xxx] - the BUTTON itself would need class="dark". */
    :host-context(.dark).primary {
      box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 45%, transparent);
    }
  `,
})
export class Button {
  readonly variant = input<ButtonVariant | undefined>(undefined);
  readonly size = input<ButtonSize>('md');
}

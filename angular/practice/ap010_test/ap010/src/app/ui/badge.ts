import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-badge',
  template: `<ng-content />`,
  host: {
    // 21.1 - binding a CSS CUSTOM PROPERTY on the host: '[style.--badge-color]'.
    // Instead of writing background, border and text colour inline (three bindings),
    // we hand ONE value to the component's own CSS, which then decides how to use it.
    // null removes the property, so the fallback in var(--badge-color, ...) kicks in.
    '[style.--badge-color]': 'color() ?? null',
  },
  styles: `
    :host {
      display: inline-block;
      padding: 1px 8px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--badge-color, var(--accent));
      background: color-mix(in srgb, var(--badge-color, var(--accent)) 15%, transparent);
      border: 1px solid color-mix(in srgb, var(--badge-color, var(--accent)) 40%, transparent);
    }

    :host-context(.dark) {
      background: color-mix(in srgb, var(--badge-color, var(--accent)) 50%, transparent);
    }
  `,
})
export class Badge {
  readonly color = input<string>();
}

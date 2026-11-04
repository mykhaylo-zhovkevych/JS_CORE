import { Directive, input, signal } from '@angular/core';

// Usage:  <button appTooltip="Saves the file">Save</button>
//         <button appTooltip="Below" tooltipPosition="bottom">...</button>
//
// The directive creates NO DOM. It only puts data on its host element:
//   data-tooltip="Saves the file"   -> the text (read by CSS with attr(data-tooltip))
//   data-tooltip-pos="top|bottom"   -> where the bubble goes
//   class="tooltip-open"            -> whether it is visible
// The bubble itself is drawn by the GLOBAL rules in styles.scss, section 4,
// because a directive cannot have its own styles.
@Directive({
  selector: '[appTooltip]',
  host: {
    // 21.1 - attribute bindings: [attr.x] writes an HTML attribute (not a DOM property).
    // Binding null would remove the attribute completely.
    '[attr.data-tooltip]': 'text()',
    '[attr.data-tooltip-pos]': 'position()',

    // 21.1 - class binding: adds/removes ONE class, leaves all other classes alone.
    '[class.tooltip-open]': 'open()',

    // 21.2 - mouse users get the tooltip on hover...
    '(mouseenter)': 'open.set(true)',
    '(mouseleave)': 'open.set(false)',
    // ...keyboard users on focus. focusin/focusout bubble (focus/blur do not), so this
    // also works when the host is a wrapper around the focusable element.
    '(focusin)': 'open.set(true)',
    '(focusout)': 'open.set(false)',

    // 21.2 with a global target: 'document:keydown.escape' listens on the DOCUMENT,
    // not on the host. Escape closes the tooltip even if focus is somewhere else.
    // `.escape` is a key filter: the handler only runs for that key.
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class Tooltip {
  readonly text = input.required<string>({ alias: 'appTooltip' });
  readonly position = input<'top' | 'bottom'>('top', { alias: 'tooltipPosition' });

  protected readonly open = signal(false);
}

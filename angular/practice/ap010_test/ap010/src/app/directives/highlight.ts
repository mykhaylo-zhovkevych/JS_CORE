import { Directive, input, signal } from '@angular/core';

// 21.3 - the classic example: a directive that changes the background colour on hover.
// Usage:  <p appHighlight>default colour</p>   or   <p appHighlight="lightgreen">custom</p>
//
// A directive is a component without a template: it attaches behaviour to an element
// that someone else wrote. Everything happens on the HOST element (the <p> above),
// which is why all the wiring lives in the `host` object below.
@Directive({
  selector: '[appHighlight]',
  host: {
    // Static host attribute (no brackets): written once, never changes.
    // Directives have no `styles`, so a small inline style like this is fine.
    style: 'transition: background-color 150ms ease',

    // 21.2 - host listeners: '(event)': 'statement'. Angular adds the listener to the
    // host element when the directive is created and removes it when it is destroyed.
    // No addEventListener / removeEventListener by hand.
    '(mouseenter)': 'hovered.set(true)',
    '(mouseleave)': 'hovered.set(false)',

    // 21.1 - host binding: '[style.backgroundColor]': expression.
    // The expression is re-evaluated whenever the signals it reads change.
    // Returning null REMOVES the inline style again, so the element falls back to
    // whatever its normal CSS says.
    '[style.backgroundColor]': 'hovered() ? color() || "var(--highlight)" : null',
  },
})
export class Highlight {
  // The input has the same name as the selector (alias), so the attribute itself
  // carries the value: appHighlight="gold". An empty attribute gives '' -> default colour.
  readonly color = input('', { alias: 'appHighlight' });

  // Host binding expressions run against the directive instance, just like template
  // expressions run against a component, so `protected` is enough - nobody outside
  // the directive needs to touch this state.
  protected readonly hovered = signal(false);
}

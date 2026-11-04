import { Directive, computed, input, signal } from '@angular/core';

// Usage:  <div appBreakpoint [breakpoint]="600"> ... </div>
//
// Puts class="compact" on the host while the browser window is narrower than
// `breakpoint` pixels. The CSS of whoever uses it decides what "compact" looks like.
// (A CSS media query can often do the same - this exists to practise window events.)
@Directive({
  selector: '[appBreakpoint]',
  // exportAs gives the directive instance a name for template reference variables:
  //   <div appBreakpoint #bp="appBreakpoint"> ... {{ bp.compact() }} ... </div>
  // Without it, #bp would point at the <div> element, not at the directive.
  exportAs: 'appBreakpoint',
  host: {
    // 21.2 - 'window:resize' listens on the global `window` object.
    // It fires very often while the user drags the window edge; for a real app you
    // would throttle it, here it only writes one number into a signal, which is cheap.
    '(window:resize)': 'onResize()',

    // 21.1 - the class binding reads a computed, so the class flips exactly when
    // the width crosses the breakpoint OR when the breakpoint input itself changes.
    '[class.compact]': 'compact()',
    '[attr.data-viewport]': 'viewportWidth() + "px"',
  },
})
export class Breakpoint {
  readonly breakpoint = input(600);

  // Starts with the current width; the resize listener keeps it up to date.
  // Public (not protected) so the template can show it through #bp="appBreakpoint".
  readonly viewportWidth = signal(window.innerWidth);

  readonly compact = computed(() => this.viewportWidth() < this.breakpoint());

  protected onResize(): void {
    this.viewportWidth.set(window.innerWidth);
  }
}

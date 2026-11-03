import { Component, ElementRef, computed, effect, input, viewChildren } from '@angular/core';

@Component({
  selector: 'app-value-bars',
  template: `
    @if (bars().length) {
      <div class="chart">
        @for (bar of bars(); track bar) {
          <div
            #bar
            class="bar"
            [class.peak]="bar.isPeak"
            [style.height.%]="bar.height"
            [title]="bar.value"
          ></div>
        }
      </div>
    } @else {
      <p class="muted">No values yet.</p>
    }
  `,
  styles: `
    .chart {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 120px;
      padding-top: 8px;
    }
    .bar {
      flex: 1;
      min-width: 4px;
      border-radius: 3px 3px 0 0;
      background: var(--accent);
      opacity: 0.55;
      transform-origin: bottom;
    }
    .bar.peak { opacity: 1; }
  `,
})
export class ValueBars {
  readonly values = input<number[]>([]);

  private readonly range = computed(() => {
    const v = this.values();
    return { min: Math.min(...v), max: Math.max(...v) };
  });

  protected readonly bars = computed(() => {
    const { min, max } = this.range();
    const span = max - min || 1;
    // map() creates brand-new objects every time a new data set comes in.
    // The template uses `track bar`, i.e. it tracks by object identity: since none of the
    // new objects is === to an old one, @for throws away all old <div>s and creates new ones.
    // That is exactly what we want here - fresh elements mean viewChildren('bar') changes,
    // which triggers the animation effect in the constructor below.
    return this.values().map((value) => ({
      value,
      height: 10 + (90 * (value - min)) / span,
      isPeak: value === max,
    }));
  });

  // viewChildren with a string = query by template reference name.
  // It collects every <div #bar> in this component's OWN template (not projected content)
  // as a Signal<readonly ElementRef[]>. Because the divs are inside @for, the list grows,
  // shrinks or gets replaced whenever @for re-renders, and the signal updates with it.
  private readonly barEls = viewChildren<ElementRef<HTMLElement>>('bar');

  constructor() {
    // Imperative way of animating the bars (Web Animations API instead of CSS classes):
    // the effect reads barEls(), so it re-runs every time the list of <div #bar> changes.
    // Each bar grows from scaleY(0) to scaleY(1); `delay: i * 15` staggers them so they
    // come in one after another from left to right, and `fill: 'backwards'` keeps a bar
    // at scaleY(0) while it is still waiting for its delay instead of flashing at full size.
    effect(() => {
      this.barEls().forEach((el, i) =>
        el.nativeElement.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
          duration: 30000,
          delay: i * 15,
          easing: 'ease-out',
          fill: 'backwards',
        }),
      );
    });
  }
}

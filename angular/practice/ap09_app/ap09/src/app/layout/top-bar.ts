import { Component, inject, input, output } from '@angular/core';
import { RandomApi } from '../core/random-api';

@Component({
  selector: 'app-top-bar',
  template: `
    <button class="btn icon" (click)="menuToggle.emit()" aria-label="Toggle navigation">☰</button>
    <h1>{{ title() }}</h1>
    <span class="spacer"></span>
    <span class="muted">
      {{ api.requestCount() }} requests
      @if (api.successRate() !== null) {
        · {{ api.successRate() }}% ok
      }
    </span>
  `,
  host: { class: 'app-bar' },
  styles: `
    h1 { font-size: 1.05rem; margin: 0; }
  `,
})
export class TopBar {
  protected readonly api = inject(RandomApi);

  readonly title = input('Random Request Lab');
  readonly menuToggle = output<void>();
}

import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RandomApi } from '../core/random-api';

@Component({
  selector: 'app-status-bar',
  imports: [DatePipe],
  template: `
    <span class="pill" [attr.data-step]="api.step()">{{ api.step() }}</span>
    <span class="muted">{{ summary() }}</span>
    <span class="spacer"></span>
    @if (api.lastEntry(); as last) {
      <span class="muted">
        last: {{ last.ok ? 'ok' : 'failed' }} · {{ last.durationMs }} ms ·
        {{ last.at | date: 'HH:mm:ss' }}
      </span>
    }
  `,
  host: { class: 'app-bar small' },
})
export class StatusBar {
  protected readonly api = inject(RandomApi);

  protected readonly summary = computed(() => {
    const s = this.api.stats();
    return s ? `${s.count} values · min ${s.min} · max ${s.max} · avg ${s.avg}` : 'no data yet';
  });
}

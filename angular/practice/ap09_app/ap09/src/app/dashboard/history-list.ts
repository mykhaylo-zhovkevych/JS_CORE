import { Component, ElementRef, effect, inject, viewChildren } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RandomApi } from '../core/random-api';

@Component({
  selector: 'app-history-list',
  imports: [DatePipe],
  template: `
    @if (api.history().length) {
      <ol class="history">
        @for (entry of api.history(); track entry.id) {
          <li #row [class.fail]="!entry.ok">
            <span class="status">{{ entry.ok ? '✓' : '✗' }}</span>
            <span class="title">{{ entry.title }}</span>
            <small class="muted">
              {{ entry.valueCount }} values · {{ entry.durationMs }} ms ·
              {{ entry.at | date: 'HH:mm:ss' }}
            </small>
          </li>
        }
      </ol>
    } @else {
      <p class="muted">No requests yet.</p>
    }
  `,
  styles: `
    .history { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
    li {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 6px 8px;
      border-radius: 6px;
      flex-wrap: wrap;
    }
    .status { color: var(--ok); font-weight: 700; }
    .fail .status { color: var(--danger); }
    .title { font-weight: 600; }
  `,
})
export class HistoryList {
  protected readonly api = inject(RandomApi);

  // viewChildren: all <li #row> elements in this template. Since they are rendered by
  // @for, the query result is re-evaluated whenever @for adds or removes a row.
  // `track entry.id` keeps existing rows alive, so only the new row is actually created.
  private readonly rows = viewChildren<ElementRef<HTMLLIElement>>('row');

  constructor() {
    // Flash the newest row whenever the list changes: the effect reads rows(), so it
    // re-runs after every new request is recorded. .at(-1) is the last (newest) row;
    // its background fades from the accent color to transparent over 1.2 seconds.
    // The ?. covers the empty case (after "Clear history" there is no last row).
    effect(() => {
      this.rows()
        .at(-1)
        ?.nativeElement.animate([{ background: 'var(--accent-soft)' }, { background: 'transparent' }], {
          duration: 1200,
        });
    });
  }
}

import { Component, computed, contentChildren, inject, input, model } from '@angular/core';
import { Tab } from './tab';

@Component({
  selector: 'ui-tabs',
  template: `
    <div class="tab-list" role="tablist">
      @for (tab of tabs(); track tab.label()) {
        <button
          role="tab"
          class="tab-button"
          [class.active]="tab.label() === current()"
          [attr.aria-selected]="tab.label() === current()"
          (click)="active.set(tab.label())"
        >
          {{ tab.label() }}
        </button>
      }
    </div>
    <ng-content />
  `,
  styles: `
    :host { display: block; }
    .tab-list { display: flex; gap: 4px; border-bottom: 1px solid var(--border); }
    .tab-button {
      padding: 6px 12px;
      border: 0;
      border-bottom: 2px solid transparent;
      background: none;
      color: var(--muted);
      font: inherit;
      cursor: pointer;
    }
    .tab-button.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 600; }
  `,
})
export class Tabs {
  // All projected <ui-tab>s, in the order they are written.
  readonly tabs = contentChildren(Tab);

  // Two-way bindable: [(active)]="..." in the parent. null = "nothing chosen yet".
  readonly active = model<string | null>(null);

  // The tab that is really shown: the chosen one, or the first tab as a default,
  // so the parent does not HAVE to pass [(active)].
  readonly current = computed(() => this.active() ?? this.tabs()[0]?.label() ?? null);
}

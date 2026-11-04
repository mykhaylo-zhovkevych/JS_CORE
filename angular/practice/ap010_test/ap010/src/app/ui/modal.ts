import { Component, input, model } from '@angular/core';


@Component({
  selector: 'ui-modal',
  template: `
    @if (open()) {
      <!-- Clicking the dark backdrop closes the modal... -->
      <div class="backdrop" (click)="close()">
        <!-- ...but clicks INSIDE the dialog must not reach the backdrop, otherwise every
             click on a button or text in the dialog would close it too. -->
        <div class="dialog" role="dialog" aria-modal="true" (click)="$event.stopPropagation()">
          <h3>{{ title() }}</h3>
          <div class="dialog-body"><ng-content /></div>
          <div class="dialog-actions"><ng-content select="[modalActions]" /></div>
        </div>
      </div>
    }
  `,
  host: {
    // 21.2 with `document`: Escape closes the modal no matter which element has focus.
    // A listener on the host or the dialog would only hear keys while focus is inside.
    // The listener exists for the whole lifetime of <ui-modal>, also while closed,
    // so close() is written to be harmless when there is nothing open.
    '(document:keydown.escape)': 'close()',
  },
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 16px;
      background: rgb(0 0 0 / 0.45);
      z-index: 50;
    }
    .dialog {
      width: min(420px, 100%);
      padding: 18px;
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      background: var(--surface);
      box-shadow: 0 20px 50px rgb(0 0 0 / 0.3);
    }
    .dialog-body { margin: 8px 0 16px; color: var(--muted); }
    .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }
  `,
})
export class Modal {
  readonly title = input('Dialog');
  readonly open = model(false);

  protected close(): void {
    if (this.open()) this.open.set(false);
  }
}

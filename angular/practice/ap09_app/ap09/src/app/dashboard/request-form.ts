import { Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RandomApi, RequestDetails } from '../core/random-api';

@Component({
  selector: 'app-request-form',
  imports: [FormsModule],
  template: `
    <form #f="ngForm" (ngSubmit)="send()" class="form-col">
      @if (api.data(); as d) {
        <p class="muted">Payload: {{ d.values.length }} values ready.</p>
      } @else {
        <p class="muted">Generate data first.</p>
      }

      <input
        #titleInput
        name="title"
        [(ngModel)]="title"
        required
        minlength="3"
        #titleCtrl="ngModel"
        placeholder="Title"
      />
      @if (titleCtrl.invalid && titleCtrl.touched) {
        <small class="error">Title needs at least 3 characters.</small>
      }

      <select name="priority" [(ngModel)]="priority">
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

      <textarea name="note" [(ngModel)]="note" placeholder="Note (optional)"></textarea>

      <label class="check">
        <input type="checkbox" name="notify" [(ngModel)]="notify" />
        Notify me
      </label>
      <label class="check">
        <input type="checkbox" name="simulateError" [(ngModel)]="simulateError" />
        Simulate a failing request
      </label>

      <button type="submit" class="btn primary" [disabled]="f.invalid || !api.canSend()">
        {{ api.step() === 'sending' ? 'Sending…' : 'Send' }}
      </button>
    </form>
  `,
})
export class RequestForm {
  protected readonly api = inject(RandomApi);

  // Local UI state: only this component cares about it, so it lives here and not in
  // the RandomApi service. Each field is a signal and is bound with [(ngModel)] in the
  // template-driven form - ngModel can read and write signals directly.
  // The values are only handed to the service when the form is submitted (send()).
  protected readonly title = signal('');
  protected readonly priority = signal<RequestDetails['priority']>('normal');
  protected readonly note = signal('');
  protected readonly notify = signal(false);
  protected readonly simulateError = signal(false);

  private readonly titleInput = viewChild.required<ElementRef<HTMLInputElement>>('titleInput');

  constructor() {
    // As soon as data is generated, put the cursor into the title field so the user
    // can type right away. The effect re-runs whenever api.step() changes, but only
    // acts on 'generated'. preventScroll: true avoids a jump - the dashboard already
    // scrolls the "Send" panel into view smoothly at the same moment.
    effect(() => {
      if (this.api.step() === 'generated') {
        this.titleInput().nativeElement.focus({ preventScroll: true });
      }
    });
  }

  protected send(): void {
    this.api.send(
      {
        title: this.title(),
        priority: this.priority(),
        note: this.note() || undefined,
        notify: this.notify(),
      },
      this.simulateError(),
    );
  }
}

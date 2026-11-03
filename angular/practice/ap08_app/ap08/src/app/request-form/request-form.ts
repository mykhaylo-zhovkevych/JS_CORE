import { Component, inject, input, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { RndGeneratorData } from '../rnd-generator/rnd-generator';

type Priority = 'low' | 'normal' | 'high';

@Component({
  selector: 'app-request-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './request-form.html',
})
export class RequestForm {
  private readonly http = inject(HttpClient);

  // the random data coming from the reactive form
  readonly data = input<RndGeneratorData | null>(null);

  // additional data, bound with [(ngModel)] (works directly with signals)
  protected readonly title = signal('');
  protected readonly priority = signal<Priority>('normal');
  protected readonly note = signal('');
  protected readonly notify = signal(false);

  protected readonly sending = signal(false);
  protected readonly response = signal<unknown>(null);
  protected readonly error = signal<string | null>(null);

  protected send(form: NgForm): void {
    const data = this.data();
    if (form.invalid || !data) {
      form.control.markAllAsTouched();
      return;
    }

    const body = {
      ...data,
      title: this.title(),
      priority: this.priority(),
      note: this.note() || undefined,
      notify: this.notify(),
    };

    this.sending.set(true);
    this.error.set(null);

    // jsonplaceholder echoes the body back with a fake id
    this.http.post('https://jsonplaceholder.typicode.com/posts', body).subscribe({
      next: res => {
        this.response.set(res);
        this.sending.set(false);
      },
      error: err => {
        this.error.set(err.message ?? 'Request failed');
        this.sending.set(false);
      },
    });
  }
}

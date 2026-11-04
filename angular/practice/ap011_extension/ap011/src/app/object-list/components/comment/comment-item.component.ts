import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MyComment } from '../../objects.data';

@Component({
  selector: 'my-comment-item',
  imports: [DatePipe],
  template: `
    <div class="flex items-start justify-between gap-4 rounded-md border border-slate-200 p-3">
      <div>
        <p>{{ comment().text }}</p>
        <small class="text-slate-500">{{ comment().createdAt | date: 'short' }}</small>
      </div>
      <button type="button" (click)="remove.emit(comment().id)"
              class="text-sm text-blue-500 hover:text-red-700">✕</button>
    </div>
  `,
})
export class MyCommentItemComponent {
  public comment = input.required<MyComment>();

  public remove = output<number>();
}

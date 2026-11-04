import { Component, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ObjectStore } from '../../object.store';
import { PRIORITIES, Priority } from '../../objects.data';
import { MyCommentItemComponent } from '../comment/comment-item.component';
import { HasUnsavedChanges } from '../../unsaved-changes.guard';

@Component({
  selector: 'my-object-item',
  imports: [DatePipe, RouterLink, MyCommentItemComponent],
  templateUrl: './object-item.component.html',
  styleUrl: './object-item.component.scss',
})
export class MyObjectItemComponent implements HasUnsavedChanges {
  private store = inject(ObjectStore);

  public id = input<string>();

  public object = this.store.byId(() => Number(this.id()));
  protected readonly priorities = PRIORITIES;

  protected readonly draft = signal('');

  public hasUnsavedChanges(): boolean {
    return this.draft().trim().length > 0;
  }

  protected changePriority(priority: Priority): void {
    const current = this.object();
    if (!current || current.priority === priority) return;
    this.store.setPriority(current.id, priority);
  }

  protected addComment(): void {
    const text = this.draft().trim();
    const current = this.object();
    if (!current || !text) return;
    this.store.addComment(current.id, text);
    this.draft.set('');
  }

  protected removeComment(commentId: number): void {
    const current = this.object();
    if (current) this.store.removeComment(current.id, commentId);
  }
}

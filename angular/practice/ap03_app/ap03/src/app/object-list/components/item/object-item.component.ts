import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ObjectStore } from '../../object.store';
import { PRIORITIES, Priority } from '../../objects.data';
import { MyCommentItemComponent } from '../comment/comment-item.component';

@Component({
  selector: 'my-object-item',
  // standalone: the template uses | date and routerLink, so import them here
  imports: [DatePipe, RouterLink, MyCommentItemComponent],
  templateUrl: './object-item.component.html',
  styleUrl: './object-item.component.scss',
})
export class MyObjectItemComponent {
  private store = inject(ObjectStore);

  public id = input<string>();

  // reads from the shared store -> updates when the id OR the store data changes
  public object = this.store.byId(() => Number(this.id()));
  protected readonly priorities = PRIORITIES;

  // called from the template: (click)="changePriority(p)"
  // the component only forwards the intent, the store owns the actual state change
  protected changePriority(priority: Priority): void {
    const current = this.object();
    if (!current || current.priority === priority) return;
    this.store.setPriority(current.id, priority);
  }

  // receives the real <input> element via the #box template reference variable
  protected addComment(box: HTMLInputElement): void {
    const text = box.value.trim();
    const current = this.object();
    if (!current || !text) return;
    this.store.addComment(current.id, text);
    // box.value = ''; // plain DOM access
  }

  // $event from the child's output<number>() arrives here as commentId
  protected removeComment(commentId: number): void {
    const current = this.object();
    if (current) this.store.removeComment(current.id, commentId);
  }
}

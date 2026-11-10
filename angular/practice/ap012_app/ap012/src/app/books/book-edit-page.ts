import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { errorMessage } from '../core/http-error';
import { Book, BOOKS_URL, BookApi } from './book.api';

const EMPTY: Book  = { id: '', title: '', author: '', year: new Date().getFullYear() };

// One page for both  /books/new  (create)  and  /books/:id  (edit).
@Component({
  selector: 'app-book-edit-page',
  imports: [RouterLink],
  template: `
    <a routerLink="/books" class="text-sm text-slate-500 hover:underline">← back</a>
    <h1 class="mb-4 mt-2 text-2xl font-semibold text-slate-800">{{ isNew() ? 'New book' : 'Edit book' }}</h1>

    @if (book.isLoading()) {
      <p class="text-slate-500">Loading…</p>
    } @else if (book.error()) {
      <p class="rounded-md bg-red-50 p-2 text-sm text-red-700">{{ loadError() }}</p>
      <button type="button" (click)="book.reload()" class="mt-2 text-sm hover:underline">Try again</button>
    } @else {
      <form class="flex max-w-md flex-col gap-3" (submit)="$event.preventDefault(); save()">
        <label class="flex flex-col text-sm text-slate-600">Title
          <input [value]="draft().title" (input)="patch('title', $event)" required
                 class="rounded-md border border-slate-300 px-3 py-1.5 text-base text-slate-900" />
        </label>
        <label class="flex flex-col text-sm text-slate-600">Author
          <input [value]="draft().author" (input)="patch('author', $event)" required
                 class="rounded-md border border-slate-300 px-3 py-1.5 text-base text-slate-900" />
        </label>
        <label class="flex flex-col text-sm text-slate-600">Year
          <input type="number" [value]="draft().year" (input)="patch('year', $event)"
                 class="rounded-md border border-slate-300 px-3 py-1.5 text-base text-slate-900" />
        </label>

        <div class="flex items-center gap-2">
          <button type="submit" [disabled]="saving()"
                  class="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700 disabled:opacity-50">
            {{ saving() ? 'Saving…' : 'Save' }}
          </button>
        </div>
        @if (saveError(); as e) {
          <p class="text-sm text-red-600">{{ e }}</p>
        }
      </form>
    }
  `,
})
export class BookEditPage {
  private readonly api = inject(BookApi);
  private readonly router = inject(Router);

  /** From the route  books/:id  (withComponentInputBinding). "new" means create. */
  public readonly id = input.required<string>();
  protected readonly isNew = computed(() => this.id() === 'new');

  // httpResource: an HTTP GET as a signal, no subscribe() anywhere.

  protected readonly book = httpResource<Book>(() => (this.isNew() ? undefined : `${BOOKS_URL}/${this.id()}`));

  protected readonly original = computed<Omit<Book, 'id'>>(() => {
    if (!this.book.hasValue()) return EMPTY;
    const { id, ...rest } = this.book.value();
    return rest;
  });

  protected readonly draft = linkedSignal(() => ({ ...this.original() }));

  protected readonly saving = signal(false);
  protected readonly saveError = signal<string | null>(null);
  protected readonly loadError = computed(() => errorMessage(this.book.error()));

  protected patch(field: keyof Book, event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.draft.update((d) => ({ ...d, [field]: field === 'year' ? Number(raw) : raw }));
  }

  protected save(): void {
    this.saving.set(true);
    this.saveError.set(null);

    const request = this.isNew() ? this.api.create({ id: '', ...this.draft() }) : this.api.update(this.id(), { id: this.id(), ...this.draft() });

    request.subscribe({
      next: () => this.router.navigateByUrl('/books'),
      error: (err) => {
        this.saveError.set(errorMessage(err));
        this.saving.set(false);
      },
    });
  }
}

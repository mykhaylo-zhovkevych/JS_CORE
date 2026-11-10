import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { errorMessage } from '../core/http-error';
import { Book, BookApi } from './book.api';
import { BookStats } from './book-stats';

interface SearchState {
  loading: boolean;
  books: Book[];
  error: string | null;
}

@Component({
  selector: 'app-book-list-page',
  imports: [RouterLink, BookStats],
  template: `
    <h1 class="mb-4 text-2xl font-semibold text-slate-800">Books</h1>

    <div class="mb-4 flex flex-wrap items-center gap-3">
      <input type="search" placeholder="Search title or author…" [value]="query()" (input)="query.set($any($event.target).value)"
             class="min-w-64 flex-1 rounded-md border border-slate-300 px-3 py-1.5" />
      <label class="flex items-center gap-1 text-sm text-slate-600">
        <input type="checkbox" [checked]="simulateError()" (change)="simulateError.set($any($event.target).checked)" />
          simulate server error
      </label>
    </div>

    @if (search().error; as e) {
      <p class="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">{{ e }}</p>
    }
    @if (actionError(); as e) {
      <p class="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">{{ e }}</p>
    }

    <p class="mb-2 h-5 text-sm text-slate-500">
      {{ search().loading ? 'Searching…' : books().length + ' result(s)' }}
    </p>

    <ul class="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white" [class.opacity-50]="search().loading">
      @for (book of books(); track book.id) {
        <li class="flex items-center gap-3 px-4 py-2">
          <a [routerLink]="['/books', book.id]" class="flex-1 hover:underline">
            <span class="font-medium">{{ book.title }}</span>
            <span class="text-sm text-slate-500"> – {{ book.author }}, {{ book.year }}</span>
          </a>
          <button type="button" (click)="remove(book)" class="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50">Delete</button>
        </li>
      } @empty {
        <li class="px-4 py-6 text-center text-slate-500">{{ search().loading ? 'Loading…' : 'No books found.' }}</li>
      }
    </ul>

    <!--
      @defer: BookStats and everything it imports are moved into their OWN JS file.
      The browser downloads it only when the trigger fires - here: clicking the placeholder.
      Look at the "Lazy chunk files" in the ng build output and the Network tab on click.
        @placeholder  shown BEFORE the trigger (and it IS the trigger element for on interaction)
        @loading      shown WHILE the chunk downloads (minimum: avoid a 20 ms flash)
        @error        shown if the chunk can't be loaded (e.g. offline)
      Other triggers: on viewport (scrolled into view), on idle (browser has nothing to do),
      on hover, on timer(2s), when someCondition() - and "prefetch on idle" to download early.
    -->
    <section class="mt-8">
      @defer (on interaction) {
        <app-book-stats />
      } @placeholder {
        <button type="button" class="w-full rounded-xl border border-dashed border-slate-300 p-4 text-slate-500 hover:bg-white">
          Show statistics (loads its code on click)
        </button>
      } @loading (minimum 400ms) {
        <p class="rounded-xl border border-slate-200 p-4 text-slate-500">Loading statistics component…</p>
      } @error {
        <p class="rounded-xl bg-red-50 p-4 text-red-700">Could not load the statistics.</p>
      }
    </section>
  `,
})
export class BookListPage {
  private readonly api = inject(BookApi);

  protected readonly query = signal('');
  protected readonly simulateError = signal(false);
  protected readonly actionError = signal<string | null>(null);

  private readonly criteria = computed(() => ({ q: this.query().trim(), fail: this.simulateError() }));

  protected readonly search = toSignal(toObservable(this.criteria).pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => a.q === b.q && a.fail === b.fail),
      switchMap(({ q, fail }) =>
        this.api.search(q, fail).pipe(
          map((books): SearchState => ({ loading: false, books, error: null })),
          catchError((err) => of<SearchState>({ loading: false, books: [], error: errorMessage(err) })),
          startWith<SearchState>({ loading: true, books: [], error: null }),
        ),
      ),
    ),
    // toSignal needs a value for "before the Observable emitted anything"
    { initialValue: { loading: true, books: [], error: null } satisfies SearchState },
  );

  protected readonly books = linkedSignal<SearchState, Book[]>({
    source: this.search,
    computation: (state, previous) => (state.loading ? (previous?.value ?? []) : state.books),
  });

  protected remove(book: Book): void {
    if (!confirm(`Delete "${book.title}"?`)) return;
    this.actionError.set(null);

    this.api.delete(book.id).subscribe({
      next: () => this.books.update((list) => list.filter((b) => b.id !== book.id)),
      error: (err) => this.actionError.set(errorMessage(err)),
    });
  }
}

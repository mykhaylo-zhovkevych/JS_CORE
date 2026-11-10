import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { Book, BOOKS_URL } from './book.api';

// Loaded lazily through @defer in BookListPage. It must not be used anywhere else
// without @defer, otherwise Angular can't split it into its own chunk.
@Component({
  selector: 'app-book-stats',
  template: `
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3 flex items-center">
        <h2 class="font-semibold text-slate-800">Statistics</h2>
        <button type="button" (click)="all.reload()" class="ml-auto text-sm text-slate-500 hover:underline">
          {{ all.isLoading() ? 'loading…' : 'reload' }}
        </button>
      </div>

      @if (all.error()) {
        <p class="text-sm text-red-700">Could not load the books.</p>
      } @else if (stats(); as s) {
        <dl class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div><dt class="text-slate-500">Books</dt><dd class="text-lg font-semibold">{{ s.count }}</dd></div>
          <div><dt class="text-slate-500">Authors</dt><dd class="text-lg font-semibold">{{ s.authors }}</dd></div>
          <div><dt class="text-slate-500">Oldest</dt><dd class="text-lg font-semibold">{{ s.oldest }}</dd></div>
          <div><dt class="text-slate-500">Newest</dt><dd class="text-lg font-semibold">{{ s.newest }}</dd></div>
        </dl>
      }
    </div>
  `,
})
export class BookStats {
  // httpResource with a fixed URL: loads once when the component is created.
  // defaultValue: [] means value() is never undefined -> no "is it loaded yet?" checks below.
  protected readonly all = httpResource<Book[]>(() => BOOKS_URL, { defaultValue: [] });

  protected readonly stats = computed(() => {
    // value() THROWS when the resource is in the error state, so check first.
    if (!this.all.hasValue()) return null;
    const books = this.all.value();
    if (books.length === 0) return null;
    const years = books.map((b) => b.year);
    return {
      count: books.length,
      authors: new Set(books.map((b) => b.author)).size,
      oldest: Math.min(...years),
      newest: Math.max(...years),
    };
  });
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export const BOOKS_URL = '/api/books';

// All HTTP for books lives here. Components never build URLs themselves.
// No token handling in sight: the interceptor adds it to every one of these calls.
@Injectable({ providedIn: 'root' })
export class BookApi {
  private readonly http = inject(HttpClient);

  public search(query: string, simulateError = false): Observable<Book[]> {

    // HttpParams builds and URL-encodes the query string for you: "lord of rings" -> q=lord%20of...
    let params = new HttpParams().set('_sort', 'title');
    if (query) params = params.set('q', query);
    if (simulateError) params = params.set('_fail', '500');

    return this.http.get<Book[]>(BOOKS_URL, { params });
  }

  public create(draft: Book): Observable<Book> {
    return this.http.post<Book>(BOOKS_URL, draft);
  }

  public update(id: string, draft: Book): Observable<Book> {
    return this.http.patch<Book>(`${BOOKS_URL}/${id}`, draft);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${BOOKS_URL}/${id}`);
  }

}

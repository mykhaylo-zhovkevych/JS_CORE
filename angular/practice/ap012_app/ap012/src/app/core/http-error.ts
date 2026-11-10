import { HttpErrorResponse } from '@angular/common/http';

export function errorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    switch (err.status) {
      case 0: // browser couldn't reach the server at all (offline, CORS, ...)
      case 502:
      case 503:
      case 504: // proxy reached nothing behind it - usually `npm run api` isn't running
        return 'Server not reachable. Is `npm run api` running?';
      case 401:
        return 'Your session expired. Please log in again.';
      case 403:
        return 'You are not allowed to do this (admins only).';
      case 404:
        return 'Not found. It may have been deleted.';
      default:
        return err.error?.message ?? `Server error (${err.status}). Is \`npm run api\` running?`;
    }
  }
  return err instanceof Error ? err.message : 'Unknown error.';
}

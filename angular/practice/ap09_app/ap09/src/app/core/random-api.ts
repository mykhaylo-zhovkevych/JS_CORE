import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GenerateParams {
  count: number;
  min: number;
  max: number;
}

export interface RndData {
  id: string;
  values: number[];
  createdAt: string;
}

export interface RequestDetails {
  title: string;
  priority: 'low' | 'normal' | 'high';
  note?: string;
  notify: boolean;
}

export interface HistoryEntry {
  id: string;
  title: string;
  valueCount: number;
  ok: boolean;
  durationMs: number;
  at: string;
}

export type Flow =
  | { step: 'idle' }
  | { step: 'generated'; data: RndData }
  | { step: 'sending'; data: RndData }
  | { step: 'done'; data: RndData; response: unknown }
  | { step: 'failed'; data: RndData; error: string };

const API = 'https://jsonplaceholder.typicode.com';
const rndInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

@Injectable({ providedIn: 'root' })
export class RandomApi {
  private readonly http = inject(HttpClient);

  // The writable signals stay private (underscore prefix), so the ONLY way to change state
  // is through the methods of this service (generate, send, reset, ...).
  // Components get read-only views via asReadonly(): they can read and react to the
  // values, but calling .set() or .update() on them is a compile error.
  private readonly _state = signal<Flow>({ step: 'idle' });
  private readonly _history = signal<HistoryEntry[]>([]);
  readonly state = this._state.asReadonly();
  readonly history = this._history.asReadonly();
  
  // ---- computed: everything below is derived, nothing is stored twice ----
  // _state and _history are the single source of truth. Every value below is calculated
  // from them, so it can never get out of sync. computed() caches its result and only
  // recalculates when one of the signals it read last time has changed.
  readonly step = computed(() => this._state().step);

  readonly data = computed(() => {
    const s = this._state();
    return s.step === 'idle' ? null : s.data;
  });

  readonly response = computed(() => {
    const s = this._state();
    return s.step === 'done' ? s.response : null;
  });

  readonly error = computed(() => {
    const s = this._state();
    return s.step === 'failed' ? s.error : null;
  });

  readonly canGenerate = computed(() => this.step() !== 'sending');
  readonly canSend = computed(() => this.step() === 'generated' || this.step() === 'failed');

  // computed can build on other computeds, forming a chain: stats -> data -> _state.
  // When _state changes, data re-evaluates; stats only re-evaluates if data actually
  // returned a different value. Returns null when there is nothing to summarize, so the
  // templates can simply check `stats()` instead of checking the array length.
  readonly stats = computed(() => {
    const values = this.data()?.values ?? [];
    if (!values.length) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      count: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      avg: Math.round((sum / values.length) * 10) / 10,
    };
  });

  readonly requestCount = computed(() => this._history().length);

  readonly successRate = computed(() => {
    const h = this._history();
    if (!h.length) return null;
    return Math.round((h.filter((e) => e.ok).length / h.length) * 100);
  });

  readonly lastEntry = computed(() => this._history().at(-1) ?? null);


  public generate({ count, min, max }: GenerateParams): void {
    if (!this.canGenerate()) return;
    this._state.set({
      step: 'generated',
      data: {
        id: crypto.randomUUID(),
        values: Array.from({ length: count }, () => rndInt(min, max)),
        createdAt: new Date().toISOString(),
      },
    });
  }

  public send(details: RequestDetails, simulateError = false): void {
    const s = this._state();
    if (s.step !== 'generated' && s.step !== 'failed') return;
    const data = s.data;

    this._state.set({ step: 'sending', data });
    const started = performance.now();
    // jsonplaceholder accepts POST /posts and echoes the body back with an id.
    // To simulate a failing request we just post to a path that does not exist:
    // the server answers 404, HttpClient turns that into an error, and the
    // error branch below moves the flow into the 'failed' step.
    const url = simulateError ? `${API}/does-not-exist` : `${API}/posts`;

    this.http.post(url, { ...data, ...details }).subscribe({
      next: (response) => {
        this.record(details.title, data, true, started);
        this._state.set({ step: 'done', data, response });
      },
      error: (err) => {
        this.record(details.title, data, false, started);
        this._state.set({ step: 'failed', data, error: err.message ?? 'Request failed' });
      },
    });
  }

  public reset(): void {
    this._state.set({ step: 'idle' });
  }

  public clearHistory(): void {
    this._history.set([]);
  }

  private record(title: string, data: RndData, ok: boolean, started: number): void {
    this._history.update((h) => [
      ...h,
      {
        id: crypto.randomUUID(),
        title,
        valueCount: data.values.length,
        ok,
        durationMs: Math.round(performance.now() - started),
        at: new Date().toISOString(),
      },
    ]);
  }
}

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { RandomApi } from './core/random-api';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('renders the shell with all four nav items', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-top-bar h1')?.textContent).toContain('Random Request Lab');
    expect(el.querySelectorAll('app-nav-item').length).toBe(4);
    expect(el.querySelectorAll('app-panel').length).toBe(4);
  });
});

describe('RandomApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('blocks sending before anything was generated', () => {
    const api = TestBed.inject(RandomApi);
    api.send({ title: 'test', priority: 'normal', notify: false });
    expect(api.step()).toBe('idle');
  });

  it('generates values inside the range and derives stats', () => {
    const api = TestBed.inject(RandomApi);
    api.generate({ count: 20, min: 5, max: 10 });
    expect(api.step()).toBe('generated');
    const stats = api.stats()!;
    expect(stats.count).toBe(20);
    expect(stats.min).toBeGreaterThanOrEqual(5);
    expect(stats.max).toBeLessThanOrEqual(10);
  });
});

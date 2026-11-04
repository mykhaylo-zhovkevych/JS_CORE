import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { Highlight } from './directives/highlight';
import { Tooltip } from './directives/tooltip';
import { Breakpoint } from './directives/breakpoint';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CardEmulated, CardNone } from './ui/cards';
import { Tabs } from './ui/tabs';
import { Dropdown } from './ui/dropdown';
import { Modal } from './ui/modal';
import { Tab } from './ui/tab';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [
    Highlight,
    Tooltip,
    Breakpoint,
    Button,
    Badge,
    CardEmulated,
    CardNone,
    Tabs,
    Tab,
    Dropdown,
    Modal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // DOCUMENT is Angular's injection token for the global `document`. Injecting it
  // instead of using `document` directly keeps the component testable and SSR-safe.
  private readonly document = inject(DOCUMENT);

  // Start with the operating system's preference, then let the user switch.
  protected readonly theme = signal<Theme>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  protected readonly showNoneCard = signal(true);
  protected readonly labTab = signal<string | null>(null);
  protected readonly menuOpen = signal(false);
  protected readonly picked = signal<string | null>(null);
  protected readonly modalOpen = signal(false);
  protected readonly deleted = signal(0);

  constructor() {
    // The theme class must sit on <html>, which is OUTSIDE every component template,
    // so no template binding can reach it. An effect is the BRIDGE: whenever theme()
    // changes, write the class onto document.documentElement. The global tokens in
    // styles.scss (:root.dark) and :host-context(.dark) in the components react to it.
    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.theme() === 'dark');
    });
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  protected pick(option: string): void {
    this.picked.set(option);
  }

  protected confirmDelete(): void {
    this.deleted.update((n) => n + 1);
    this.modalOpen.set(false);
  }
}

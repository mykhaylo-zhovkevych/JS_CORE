import {
  ChangeDetectionStrategy, Component, ElementRef, Injector,
  afterEveryRender, afterNextRender, inject, viewChild,
} from '@angular/core';
import { LegacyGameModule } from './legacy/legacy-game.module';
import { ModernBoardComponent } from './modern/modern-board';
import { checks, resetChecks } from './shared/check-counter';

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  // A standalone root can import other an old NgModule, or other standalone components.
  imports: [RouterOutlet, LegacyGameModule, ModernBoardComponent],

  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  zone = new URLSearchParams(location.search).get('zone') === '1';

  private injector = inject(Injector);
  private stats = viewChild.required<ElementRef<HTMLElement>>('stats');

  constructor() {
    // Writes the counter values into the DOM directly, after every render
    afterEveryRender(() => this.showChecks());
  }

  resetCounters(): void {
    afterNextRender(() => {
      resetChecks();
      this.showChecks();
    }, { injector: this.injector });
  }

  private showChecks(): void {
    this.stats().nativeElement.textContent = `Legacy board: ${checks.legacyBoard}   Legacy cells: ${checks.legacyCells}\n` +
      `Modern board: ${checks.modernBoard}   Modern cells: ${checks.modernCells}`;
  }
}

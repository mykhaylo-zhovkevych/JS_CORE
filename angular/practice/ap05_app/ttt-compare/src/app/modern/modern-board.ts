import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ModernCellComponent } from './modern-cell';
import { ModernGameService } from './modern-game';
import { countModernBoard } from '../shared/check-counter';


@Component({
    selector: 'modern-board',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ModernCellComponent], // New: the component what its template uses, no module needed
    templateUrl: './modern-board.html',
})
export class ModernBoardComponent {

    protected game = inject(ModernGameService); // New: inject() function instead of constructor injection
    protected seconds = signal(0);

    count = countModernBoard;

    constructor() {
        // Setting a signal tells Angular that to re-render the template when the signal changes.
        const id = setInterval(() => {
            if (!this.game.over()) {
                this.seconds.update(n => n + 1);
            }
        }, 1000);

        inject(DestroyRef).onDestroy(() => clearInterval(id));
    }

    reset(): void {
        this.game.reset();
        this.seconds.set(0);
    }
}

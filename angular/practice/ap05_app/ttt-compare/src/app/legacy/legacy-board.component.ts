import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cell, Player, TIME_LIMIT } from '../shared/game.logic';
import { LegacyGameService } from './legacy-game.service';
import { countLegacyBoard } from '../shared/check-counter';

@Component({
    selector: 'legacy-board',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './legacy-board.component.html',
})

export class LegacyBoardComponents implements OnInit, OnDestroy {
    // Old: plain fields, copied out of the observable by hand
    board: Cell[] = [];
    winner: Player | null = null;
    next: Player = 'X';
    draw = false;
    seconds = 0;

    count = countLegacyBoard;

    get timeUp() { return this.seconds >= TIME_LIMIT; }

    private subscription?: Subscription;
    private timerId?: ReturnType<typeof setInterval>;

    // Old: constructor injection
    constructor(private game: LegacyGameService) {}

    // Old: setup in ngOnInit
    ngOnInit(): void {
        this.subscription = this.game.state$.subscribe(state => {
            this.board = state.board;
            this.winner = state.winner;
            this.next = state.next;
            this.draw = state.draw;
        });

        // A plain field changed inside setInterval
        // Only Zone.js notices this. Zoneless, the clock freezes on screen
        this.timerId = setInterval(() => {
            if (!this.winner && !this.draw && !this.timeUp) {
                this.seconds++;
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        clearInterval(this.timerId);    
    }

    onPlay(i: number): void {
        if (this.timeUp) return;
        this.game.play(i);
    }

    reset(): void {
        this.game.reset();
        this.seconds = 0;
    }

    trackByIndex(index: number): number {
        return index;
    }
}

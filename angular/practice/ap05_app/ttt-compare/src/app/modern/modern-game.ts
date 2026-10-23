import { Injectable, computed, signal } from '@angular/core';
import { Cell, emptyBoard, getWinner, isDraw, nextPlayer } from '../shared/game.logic';

// New: providedIn 'root' registers the service app-wide, no providers array needed
// one writable signal; evetyhing else is derived with computed signals

@Injectable({ providedIn: 'root' })
export class ModernGameService {
    readonly board = signal<Cell[]>(emptyBoard());

    readonly winner = computed(() => getWinner(this.board()));
    readonly next = computed(() => nextPlayer(this.board()))
    readonly draw = computed(() => isDraw(this.board()));
    readonly over = computed(() => this.winner() !== null || this.draw());

    play(i: number): void {
        if (this.board()[i] || this.over()) {
            return;
        }
        const player = this.next();
        this.board.update(board => board.map
            ((cell, index) => (index === i ? player : cell))
        );
    }

    reset(): void {
        this.board.set(emptyBoard());
    }
}

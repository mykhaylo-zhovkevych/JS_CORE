import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cell, Player, emptyBoard, getWinner, isDraw, nextPlayer } from '../shared/game.logic';

export interface GameState {
    board: Cell[];
    winner: Player | null;
    next: Player;
    draw: boolean;
}

function toState(board: Cell[]) : GameState {
    return {
        board, winner: getWinner(board), next: nextPlayer(board), draw: isDraw(board)
    };
}

// OLD class +@Injectable, registered in module NgModule's providers array
// State does live in the BehaviorSubject; derived values are computed on demand in the toState function
@Injectable() 
export class LegacyGameService {
    
    private stateSubj = new BehaviorSubject<GameState>(toState(emptyBoard()));
    state$ = this.stateSubj.asObservable();

    
    play(index: number): void {
        const state = this.stateSubj.value;
        if (state.board[index] || state.winner || state.draw) {
            return;
        }

        const board = [...state.board];
        board[index] = state.next;
        this.stateSubj.next(toState(board));
    }

    reset(): void {
        this.stateSubj.next(toState(emptyBoard()));
    }
}

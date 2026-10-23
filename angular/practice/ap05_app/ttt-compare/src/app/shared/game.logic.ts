export type Player = 'X' | 'O';
export type Cell = Player | null;

export const TIME_LIMIT = 30;

const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

export function emptyBoard(): Cell[] {
    return Array(9).fill(null); // [null, null, null, null, null, null, null, null, null]
}

// a if winning if the same player occupies all 3 cells of a line
export function getWinner(board: Cell[]): Player | null {
    for (const [a, b, c] of LINES) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// if the board is full and there is no winner, it's a draw
export function nextPlayer(board: Cell[]): Player {
    const moves = board.filter(cell => cell !== null).length;
    return moves % 2 === 0 ? 'X' : 'O';
}

export function isDraw(board: Cell[]): boolean {
    return getWinner(board) === null && board.every(cell => cell !== null);
}

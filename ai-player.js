export class AIPlayer {
    constructor() {
        this.difficulty = 'medium';
    }

    getMove(board) {
        // For now, implement a simple random move strategy
        const availableMoves = this.getAvailableMoves(board);
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    getAvailableMoves(board) {
        return board.reduce((moves, cell, index) => {
            if (cell === '') moves.push(index);
            return moves;
        }, []);
    }

    // Future improvements: Implement minimax algorithm for more intelligent moves
    minimax(board, depth, isMaximizing) {
        // Advanced AI strategy to be implemented
    }
}
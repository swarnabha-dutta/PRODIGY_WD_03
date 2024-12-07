export class GameBoard {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];
        this.boardElement = document.getElementById('gameBoard');
    }

    makeMove(index, player) {
        if (this.isCellEmpty(index)) {
            this.board[index] = player;
            this.updateBoardDisplay(index, player);
        }
    }

    updateBoardDisplay(index, player) {
        const cell = this.boardElement.querySelector(`[data-index="${index}"]`);
        cell.classList.add(player.toLowerCase());
    }

    isCellEmpty(index) {
        return this.board[index] === '';
    }

    checkWinner() {
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (
                this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]
            ) {
                return this.board[a];
            }
        }
        return null;
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    isGameOver() {
        return this.checkWinner() !== null || this.isBoardFull();
    }

    reset() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        const cells = this.boardElement.querySelectorAll('.board-cell');
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
        });
    }

    lockBoard() {
        // Prevent further moves after game is over
    }
}
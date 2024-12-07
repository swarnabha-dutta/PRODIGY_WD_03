import { GameBoard } from './game-board.js';
import { AIPlayer } from './ai-player.js';

export class TicTacToeGame {
    constructor() {
        this.gameBoard = new GameBoard();
        this.aiPlayer = new AIPlayer();
        this.currentMode = null;
        this.playerXScore = 0;
        this.playerOScore = 0;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('two-player-mode').addEventListener('click', () => this.startGame('two-player'));
        document.getElementById('ai-mode').addEventListener('click', () => this.startGame('ai'));
        document.getElementById('resetButton').addEventListener('click', () => this.resetGame());
        document.getElementById('changeModeButton').addEventListener('click', () => this.showModeSelection());
    }

    startGame(mode) {
        this.currentMode = mode;
        document.querySelector('.game-mode-selection').style.display = 'none';
        document.getElementById('gameSection').style.display = 'block';
        
        this.gameBoard.reset();
        this.updateStatus(`Player X's turn`);
    }

    handleCellClick(index) {
        if (!this.gameBoard.isCellEmpty(index)) return;

        this.gameBoard.makeMove(index, 'X');
        this.checkGameStatus();

        if (this.currentMode === 'ai' && !this.gameBoard.isGameOver()) {
            setTimeout(() => {
                const aiMove = this.aiPlayer.getMove(this.gameBoard.board);
                this.gameBoard.makeMove(aiMove, 'O');
                this.checkGameStatus();
            }, 500);
        }
    }

    checkGameStatus() {
        const winner = this.gameBoard.checkWinner();
        if (winner) {
            this.updateScore(winner);
            this.updateStatus(`Player ${winner} wins!`);
            this.gameBoard.lockBoard();
        } else if (this.gameBoard.isBoardFull()) {
            this.updateStatus("It's a draw!");
        }
    }

    updateScore(winner) {
        if (winner === 'X') {
            this.playerXScore++;
            document.getElementById('playerXScore').textContent = this.playerXScore;
        } else {
            this.playerOScore++;
            document.getElementById('playerOScore').textContent = this.playerOScore;
        }
    }

    resetGame() {
        this.gameBoard.reset();
        this.updateStatus(`Player X's turn`);
    }

    showModeSelection() {
        document.getElementById('gameSection').style.display = 'none';
        document.querySelector('.game-mode-selection').style.display = 'block';
        this.gameBoard.reset();
    }

    updateStatus(message) {
        document.getElementById('gameStatus').textContent = message;
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToeGame();
    
    document.getElementById('gameBoard').addEventListener('click', (event) => {
        if (event.target.classList.contains('board-cell')) {
            const index = event.target.getAttribute('data-index');
            game.handleCellClick(parseInt(index));
        }
    });
});
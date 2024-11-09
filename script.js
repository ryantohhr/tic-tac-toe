// Gameboard (object)
// => IIFE
// => Array of arrays
// => 3 rows, 3 columns
// => return board, reset board function

const gameboard = (function() {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    function placeMarker(player, cell) {
        board[cell[0]][cell[1]].placeMarker(player);
    }

    function printBoard() {
        displayBoard = 
            board.map((row) => {
                return row.map((cell) => {
                    return cell.getDigit();
                });
            });
        console.log(displayBoard);
    }

    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = Cell();
            }
        }
    }

    function checkWinner(field) {
        if (field.every((cell) => cell.getDigit() === 1)) {
            return 1;
        }
        else if (field.every((cell) => cell.getDigit() === 2)) {
            return 2;
        }
    }

    let winner;

    function checkRows() {
        for (let i = 0; i < 3; i++) {
            if (!winner) {
                winner = checkWinner(board[i]);
            }
        }
    }

    function checkColumns() {
        let column;
        for (let i = 0; i < 3; i++) {
            column = [];
            for (let j = 0; j < 3; j++) {
                column.push(board[j][i]);
            }
            if (!winner) {
                winner = checkWinner(column);
            }
        }
    }

    function checkDiagonals() {
        let diagonal;
        diagonal = [];
        for (let i = 0; i < 3; i++) {
            
            diagonal.push(board[i][i]);
        }
        if (!winner) {
            winner = checkWinner(diagonal);
        }
        diagonal = [];
        for (let i = 0; i < 3; i++) {
            diagonal.push(board[i][2-i]);
        }
        if (!winner) {
            winner = checkWinner(diagonal);
        }
    }

    function checkGame() {
        checkRows();
        checkColumns();
        checkDiagonals();
        if (winner) {
            DOMGenerator.showWinner(winner);
            DOMGenerator.endGame();
        }
    }
    
    function resetWinner() {
        winner = null;
    }

    return { board, placeMarker, printBoard, resetBoard, checkGame, resetWinner }
})();


// Cell
// => Factory function
// => Start: 0, PLayer 1: 1, PLayer 2: 2
// => Should return: digit, Place marker function
// => (Maybe) Read marker function, reset cell function

function Cell() {
    let digit = 0;

    function getDigit() {
        return digit;
    }

    function placeMarker(player) {
        if (!digit) {
            digit = player;
        }
    }

    return { getDigit, placeMarker }
}


// Players (objects) 
// => Factory function
// => name, player number

// Controller (object)
// => IIFE
// => Should return: Place marker function, Current player funtion

const gameController = (function() {
    let currentPlayer = 1;

    function resetPlayer() {
        currentPlayer = 1;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    function playRound(cell, grid) {
        if (gameboard.board[cell[0]][cell[1]].getDigit()) {
        }
        else {
            gameboard.placeMarker(currentPlayer, cell);
            gameboard.printBoard();
            DOMGenerator.changeBoard(grid);
            gameboard.checkGame();
            switchPlayer();
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function resetGame() {
        gameboard.resetBoard();
        resetPlayer();
        DOMGenerator.renderBoard();
        DOMGenerator.removeWinner();
        gameboard.resetWinner();
    }

    return { playRound, getCurrentPlayer, resetGame }
})();

const DOMGenerator = (function() {

    const winnerDisplay = document.querySelector(".winner");
    const board = document.querySelector(".board");

    function renderBoard() {
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const grid = document.createElement("div");
                const cell = [i, j];
                grid.addEventListener('click', () => gameController.playRound(cell, grid));
                board.appendChild(grid);
            }
        }
    }

    function changeBoard(grid) {
        if (gameController.getCurrentPlayer() === 1 && !grid.innerHTML) {
            grid.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>X</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';
        }
        else if (gameController.getCurrentPlayer() === 2  && !grid.innerHTML) {
            grid.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>O</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
        }
    }

    function showWinner(winner) {
        const winnerText = document.createElement("div");
        switch (winner) {
            case 1:
                winnerText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>X</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg> wins!';
                break;
            case 2:
                winnerText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>O</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg> wins!';
        }
        winnerText.style.cssText = "font-size: 2rem; display: flex; align-items:center; gap: 8px";

        const winnerBtn = document.createElement("button");
        winnerBtn.textContent = "Play Again"
        winnerBtn.addEventListener('click', () => {
            gameController.resetGame();
        });

        winnerDisplay.append(winnerText, winnerBtn);
    }

    function removeWinner() {
        while (winnerDisplay.firstChild) {
            winnerDisplay.removeChild(winnerDisplay.firstChild);
        }
    }

    function endGame() {
        const grids = document.querySelectorAll(".board > div");
        grids.forEach((grid) => {
            grid.style.cssText += "pointer-events: none;";
        })
    }

    return { renderBoard, changeBoard, showWinner, removeWinner, endGame };
})();

DOMGenerator.renderBoard();
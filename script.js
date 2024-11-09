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

    return { board, placeMarker, printBoard, resetBoard }
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
        if (digit) {
            console.log("Cell already occupied.");
        }
        else {
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
    let players = [1, 2];

    let currentPlayer = 1;

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    function playRound(cell) {
        gameboard.placeMarker(currentPlayer, cell);
        switchPlayer();
        gameboard.printBoard();
    }

    function getCurrentPlayer() {
        console.log(currentPlayer);
    }

    return { playRound, getCurrentPlayer }
})();
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
        console.log(board);
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

    function placeMarker(player) {
        digit = player;
    }

    return { digit, placeMarker }
}


// Players (objects) 
// => Factory function
// => name, player number

// Controller (object)
// => IIFE
// => Should return: Place marker function, Current player funtion
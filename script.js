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

    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = Cell();
            }
        }
    }

    return { board, resetBoard }
})


// Cell
// => Factory function
// => Start: 0, PLayer 1: 1, PLayer 2: 2
// => Should return: cell(number), Place marker function, Read marker function, reset cell function

// Players (objects) 
// => Factory function
// => name, player number

// Controller (object)
// => IIFE
// => Should return: Place marker function, Current player funtion
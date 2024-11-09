// Gameboard (object)
// => IIFE
// => Array of arrays
// => 3 rows, 3 columns
// => return board, reset board function

const gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    resetBoard()
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
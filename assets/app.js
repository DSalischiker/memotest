var board = [];
//Function that creates the board according to the size the user selected
function drawBoard(selectedSize) {
    var boardSize = selectedSize.value;
    var totalTiles = boardSize * boardSize;
    createLogicalBoard(boardSize);
    setTilesLogicalBoard(boardSize, totalTiles);
    var container = $(".container");
    container.empty();

    container.css({
        "grid-template-columns": "repeat(" + boardSize + ", 1fr)",
        "grid-template-rows": "repeat(" + boardSize + ",1fr)"
    });
    for (let i = 0; i < totalTiles; i++) {
        container.append("<div id='tile" + i + "'>" + i + "</div>");
    }
    /* console.log(randomposition(quantTiles)); */
}

function createLogicalBoard(boardSize) {

    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = "";
        }
    }
    console.log(board);
}

function setTilesLogicalBoard(boardSize, totalTiles) {

    for (let i = 0; i < totalTiles; i++) {
        //Look for two empty spaces and set the tile value for both of them (i)
        position = null;
        do {
            position = randomposition(boardSize);
            //Set i value for the random position
            board[position[0]][position[1]] = i;
            console.log("Posición " + position + " = " + board[position[0]][position[1]]);
        } while (board[position[0]][position[1]] === "");
        position = null;
        do {
            position = randomposition(boardSize);
            //Set i value for the random position
            board[position[0]][position[1]] = i;
            console.log("Posición " + position + " = " + board[position[0]][position[1]]);
        } while (board[position[0]][position[1]] === "");

    }
}

function randomposition(boardSize) {
    var position = Math.floor(Math.random() * (boardSize));
    position = position + "" + Math.floor(Math.random() * (boardSize));
    return position;
}

function loadTile() {
    return Math.floor(Math.random() * (18 - 1)) + 1;
}
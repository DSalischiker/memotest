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
    position = randomposition(boardSize);
    for (let i = 0; i < totalTiles; i++) {

        if (board[position[0]][position[1]] === "") {
            board[position[0]][position[1]] = loadTile();
            console.log("Posición " + position + " = " + board[position[0]][position[1]]);
        }
    }
}

function randomposition(boardSize) {
    /* return Math.floor(Math.random() * (totalTiles)); */
    var position = Math.floor(Math.random() * (boardSize));
    position = position + "" + Math.floor(Math.random() * (boardSize));
    console.log(position);
    return position;
}

function loadTile() {
    return Math.floor(Math.random() * (18 - 1)) + 1;
}
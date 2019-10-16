//Function that creates the board according to the size the user selected
var board = [];

function drawBoard(selectedSize) {
    //asigna a la variable boardsize la longitud del tablero elegida por el usuario
    var boardSize = selectedSize.value;
    //Llama a función para crear el tablero lógico (la matriz)
    createLogicalBoard(boardSize);
    //Llama a función para asignar las fichas al tablero lógico
    setTilesLogicalBoard(boardSize);
    //Creo dinámicamente HTML con los divs necesarios según tamaño del tablero
    var container = $(".container");
    container.empty();
    container.css({
        "grid-template-columns": "repeat(" + boardSize + ", 1fr)",
        "grid-template-rows": "repeat(" + boardSize + ",1fr)"
    });
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            var tile = i + "" + j;
            //El ID que le asigna es la posición que tiene en la matriz (row(i) y column(j)) y el inner text es la ficha que le asignó el random
            container.append("<div id='" + tile + "' onclick='clickTile(this)'><img id='img" + board[i][j].ficha + "' src='" + board[i][j].imagen + "'/></div>");
        }
    }

}

function clickTile(div) {
    console.log("Clickeé la ficha " + div);
}

function createLogicalBoard(boardSize) {
    //Creates matrix with size choosed by user
    for (let i = 0; i < boardSize; i++) {
        board.push([]);
        for (let j = 0; j < boardSize; j++) {
            board[i].push("");
        }
    }
    console.log(board);
}

function setTilesLogicalBoard(boardSize) {
    //Crea array con todas las posiciones posibles y las mezcla
    var positions = createPositionsArray(boardSize);
    //inicializa un contador interno y la variable que va a tener la ficha a asignar
    var contInterno = 0;
    var ficha = 0;
    for (let i = 0; i < positions.length; i++) {
        //Recorre todo el array de posiciones. Asigna el valor de la variable ficha a la posición i
        board[positions[i].row][positions[i].col] = {
            ficha: ficha, //QUE FICHA ES
            estado: 0, //YA FUE ENCONTRADA LA PAREJA Y POR QUE JUGADOR --> 0 (no fue encontrada), 1 (fue encontrada por JUG1, 2 (FUE ENCONTRADA POR JUG2))
            imagen: "./assets/img/" + ficha + ".jpg", //SRC DE LA IMG
            clicked: false //FUE CLICKEADA TRUE/FALSE
        };
        //aumenta contador interno
        contInterno++;
        //Si es 2 quiere decir que ya puso el mismo valor ficha en dos posiciones (el par)
        if (contInterno === 2) {
            //entonces reinicia el contador interno y aumenta en uno la ficha
            contInterno = 0;
            ficha++;
        }
    }
}

function createPositionsArray(boardSize) {
    var positions = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            //asigna un objeto con row i y col j a cada posición del array
            positions.push({
                row: i,
                col: j
            });
        }
    }
    //las mezcla
    shuffle(positions);
    return positions;
}

function shuffle(positions) {
    //Función para mezclar array
    var currentIndex = positions.length;
    var temporaryValue, randomIndex;
    //While there remain elements to shuffle...
    while (0 != currentIndex) {
        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //And swap it with the current element
        temporaryValue = positions[currentIndex];
        positions[currentIndex] = positions[randomIndex];
        positions[randomIndex] = temporaryValue;
    }
    return positions;
}
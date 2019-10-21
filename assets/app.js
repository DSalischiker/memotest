//Function that creates the board according to the size the user selected
var board = [];

var click1, click2, div1, div2;
var turno = true;
var h3Turno = $("#turno");

var disableAll = false;

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
            /* container.append("<div id='" + tile + "' onclick='clickTile(" + JSON.stringify(tile) + ")'><img id='img" + board[i][j].ficha + "' src='" + board[i][j].imagen + "'/></div>"); */
            container.append("<div id='" + tile + "' class='flip-box' onclick='clickTile(" + JSON.stringify(tile) + ")'><div class='flip-box-inner'><div class='flip-box-front'><img src='' alt=''/></div><div class='flip-box-back'><img id='img" + board[i][j].ficha + "' src='" + board[i][j].imagen + "'></div></div></div>");
        }
    }
    h3Turno.text("Turno: Jugador 1");
}

function clickTile(divId) {
    if (disableAll) {
        return;
    }
    console.log("Clickeé el div " + divId + " y es de tipo: " + typeof (divId));
    var ficha = board[divId[0]][divId[1]];
    document.getElementById(divId).removeAttribute("onClick");
    document.getElementById(divId).setAttribute("class", "flip-box clicked");
    console.log("ficha: " + ficha.valor);
    if (click1 == null) {
        console.log("entré al if");
        click1 = ficha.valor;
        div1 = divId;
    } else {
        click2 = ficha.valor;
        div2 = divId;
        if (click1 === click2) {
            console.log("IGUALES");
            click1 = null;
            click2 = null;
            if (turno === true) {
                //Se guarda qué jugador encontró el par
                board[divId[0]][divId[1]].estado = 1; //JUGADOR 1
            } else {
                board[divId[0]][divId[1]].estado = 2; //JUGADOR 2
            }
        } else {
            console.log("DISTINTAS");
            disableAll = true;
            setTimeout(function () {
                console.log("timer!", div1, div2);
                document.getElementById(div1).setAttribute("class", "flip-box");
                document.getElementById(div2).setAttribute("class", "flip-box");
                div1 = null;
                div2 = null;
                click1 = null;
                click2 = null;
                ficha = null;
                turno = !turno;
                if (turno === true) {
                    h3Turno.text("Turno: Jugador 1");
                } else {
                    h3Turno.text("Turno: Jugador 2");
                }
                disableAll = false;
            }, 1500);
            document.getElementById(div1).setAttribute("onClick", "clickTile('" + div1 + "')");
            /* document.getElementById(div1).setAttribute("class", "flip-box"); */
            document.getElementById(div2).setAttribute("onClick", "clickTile('" + div2 + "')");
            /* document.getElementById(div2).setAttribute("class", "flip-box"); */

        }
    }
}

function myTimer(div1, div2) {
    console.log("timer!", div1, div2)
    document.getElementById(div1).setAttribute("class", "flip-box");
    document.getElementById(div2).setAttribute("class", "flip-box");
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
            valor: ficha, //QUE FICHA ES
            estado: 0, //YA FUE ENCONTRADA LA PAREJA Y POR QUE JUGADOR --> 0 (no fue encontrada), 1 (fue encontrada por JUG1, 2 (FUE ENCONTRADA POR JUG2))
            imagen: "./assets/img/" + ficha + ".jpg", //SRC DE LA IMG
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
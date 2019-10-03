//Function that creates the board according to the size the user selected
function drawHTMLBoard(selectedSize) {
    console.log("Entré a la función");
    var container = $(".container");
    container.empty();
    quantCards = selectedSize.value * selectedSize.value;
    console.log("quantCards = " + quantCards);
    container.css({
        "grid-template-columns": "repeat(" + selectedSize.value + ", 1fr)",
        "grid-template-rows": "repeat(" + selectedSize.value + ",1fr)"
    });
    for (let i = 0; i < quantCards; i++) {
        console.log("Entré al for");
        container.append("<div>" + i + "</div>");
    }
}

var tablero = [];

for( i=0; i < selectedSize.value; i++){
    tablero[i] = new Array(selectedSize.value);
};
//Function that creates the board according to the size the user selected
function drawHTMLBoard(selectedSize) {
    var container = $(".container");
    container.empty();
    quantTiles = selectedSize.value * selectedSize.value;
    container.css({
        "grid-template-columns": "repeat(" + selectedSize.value + ", 1fr)",
        "grid-template-rows": "repeat(" + selectedSize.value + ",1fr)"
    });
    for (let i = 0; i < quantTiles; i++) {
        container.append("<div id='tile" + i + "'>" + i + "</div>");
    }
}
function drawHTMLBoard(selectedSize) {
    var container = $(".container");
    for (let i = 0; i < selectedSize; i++) {
        container.append("<div>" + i + "</div>");
    }
}
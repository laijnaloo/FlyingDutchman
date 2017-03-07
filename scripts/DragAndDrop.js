
var totalPrice = 0;


function setDraggable() {
    //Turns all objects of class ".drinks" to draggable objects.
    $(".drinks").draggable({
        appendTo: "body",
        cursor: "move",
        helper: 'clone',  //Creates a clone of the dragged item
        revert: "invalid" //Returns draggable item to initial position when not dropped in droppable area
    });

    //Makes orderBox a droppable area
    $("#orderBox").droppable({
        tolerance: "intersect",
        accept: ".drinks", //Only accept objects of class ".drinks"
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {

            //Appends a dropped object to order array in sessionStorage and stores it.
            var order = JSON.parse(sessionStorage.getItem("order"));
            if(order == null) { //If no items have been added to the order yet, initiate order as an empty array.
                order = [];
            }
            var beverage = {name:$(ui.draggable.find('p')[0]).text().trim(), price:parseInt($(ui.draggable.find('p')[1]).text().trim())}; //Creates a beverage object of the dragged item
            order.push(beverage); //Add beverage to order array.
            sessionStorage.setItem("order", JSON.stringify(order)); //Store array in sessionStorage



            //Adds the price of the dropped beer to the total order price and updates the value in the document.
            beerPrice=(parseInt($(ui.draggable.find('p')[1]).text().trim())); //Gets the text in the second paragraph of dragged item and parses the text to int.
            totalPrice = beerPrice+totalPrice;
            document.getElementById("totalPrice").innerHTML = totalPrice;

            //Appends the name of the dragged item to the div "orderName" and
            //appends the price of the dragged item to the div "orderPrice".
            $(document.getElementById("orderName")).prepend($(ui.draggable.find('p')[0]).clone());
            $(document.getElementById("orderPrice")).prepend($(ui.draggable.find('p')[1]).clone());

        }
    });


}
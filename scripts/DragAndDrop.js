
var totalPrice = 0;


function setDraggable() {
    //Turns all objects of class ".drinks" to draggable objects.
    $(".drinksInfo").draggable({
        appendTo: "body", //Puts the dragged object at the end of the <body> tag.
        cursor: "move", //Transforms the cursor symbol to a symbol which indicates that the object is movable.
        helper: 'clone',  //Creates a clone of the dragged item
        revert: "invalid" //Returns draggable item to initial position when not dropped in droppable area
    });

    //Makes orderBox a droppable area
    $("#orderBox").droppable({
        tolerance: "intersect", //Draggable object needs to be 50% inside the droppable area.
        accept: ".drinksInfo", //Only accept objects of class ".drinks"
        drop: function (event, ui) {

            //Adds item to order
            addItemToOrder($(ui.draggable.find('p')[0]).text().trim(), parseInt($(ui.draggable.find('p')[1]).text().trim()));


        }
    });


}
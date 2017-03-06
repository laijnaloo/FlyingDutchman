
var totalPrice = 0;

function setDraggable() {
    $(".drinks").draggable({
        appendTo: "body",
        cursor: "move",
        helper: 'clone',
        revert: "invalid"
    });

    $("#orderBox").droppable({
        tolerance: "intersect",
        accept: ".drinks",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {

            //var order = JSON.parse(localStorage.getItem("order"));
            //order.append()
            //localStorage.setItem("order", "Name: " + ui.draggable.find('p')[0].innerHTML);

            totalPrice=totalPrice+ (parseInt($(ui.draggable.find('p')[1]).text().trim()));
            document.getElementById("totalPrice").innerHTML = totalPrice;

            $(document.getElementById("orderName")).prepend($(ui.draggable.find('p')[0]).clone());
            $(document.getElementById("orderPrice")).prepend($(ui.draggable.find('p')[1]).clone());

        }
    });


}
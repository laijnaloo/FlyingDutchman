



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
            $(document.getElementById("orderName")).append($(ui.draggable.find('p')[0]).clone());
            $(document.getElementById("orderPrice")).append($(ui.draggable.find('p')[1]).clone());

        }
    });


}
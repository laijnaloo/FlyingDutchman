



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
        drop: function(event, ui) {
            $(document.getElementById("orderContent")).append($(ui.draggable.find('p')).clone());
        }
    });

}
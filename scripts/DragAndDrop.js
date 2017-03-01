

$(document).ready(function(){
    $(".drinks").draggable({
        appendTo: "body",
        cursor: "move",
        helper: 'clone',
        revert: "invalid"
    });

    $("#orderContent").droppable({
        tolerance: "intersect",
        accept: ".drinks",
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function(event, ui) {
            $(this).append($(ui.draggable));
        }
    });



});



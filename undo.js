/**
 * Created by Anna on 2017-03-03.
 */

var order; //array that consists of items put in order bag
var cursor; //if no redo done, should always be the length of the array

window.addEventListener("DOMContentLoaded", init, false);

function init(){
    order = [];
    cursor = 0;
}

/* Pushes the beers ID onto an Array, moves the cursor to end of array (array.len*/
function add(ID){
    order.splice(cursor, order.length - cursor);
    cursor = order.push(ID);
}

/* if array not empty, move cursor back and return that item */
function undo(){
    if(order.length > 0){
        cursor--;
        return order[cursor - 1];
    }
    console.log("No undo available");
    return 0;
}

/*  if redo options available, move cursor forward and return that item */
function redo(){
    if(order.length > cursor){
        cursor++;
        return order[cursor - 1];
    }
    console.log("No redo available");
    return 0;
}
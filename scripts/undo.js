/**
 * Created by Anna on 2017-03-03.
 */

var order; //array that consists of items put in order bag
var cursor; //if no redo done, should always be the length of the array

window.addEventListener("DOMContentLoaded", init, false);


function init(){
    order = localStorage.getItem("order");//JSON.parse(localStorage.getItem("order"));
    cursor = localStorage.getItem("undoCursor");
    if(order == null) {
        order = [];
        cursor = 0;
    }
}

/* Pushes the beers ID onto an Array, moves the cursor to end of array (array.len*/
function add(ID){
    order.splice(cursor, order.length - cursor);
    cursor = order.push(ID);
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("undoCursor", cursor);
}

/* if array not empty, move cursor back and return that item */
function undo(){
    if(order.length > 0){
        cursor--;
        localStorage.setItem("undoCursor", cursor);
        return order[cursor - 1];
    }
    console.log("No undo available");
    return 0;
}

/*  if redo options available, move cursor forward and return that item */
function redo(){
    if(order.length > cursor){
        cursor++;
        localStorage.setItem("undoCursor", cursor);
        return order[cursor - 1];
    }
    console.log("No redo available");
    return 0;
}

/* Should be called after order confirmation */
function clearOrder(){
    order = [];
    cursor = 0;
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("undoCursor", cursor);
}
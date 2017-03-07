/**
 * Created by Anna on 2017-03-03.
 * updated by Lina Andersson on 2017-03-04.
 */

var orderModel = {}
orderModel.orders = [];

//history of the changes in the order model, used for undo/redo
var orderHistory = [JSON.parse(JSON.stringify(orderModel))];

//the number in the history array that is currently shown
var historyPointer = 0;

function saveHistory() {
    //copies the data so it will refer to different objects, so that history snapshots will be different objects
    copy = JSON.parse(JSON.stringify(orderModel));

    // if user has pressed undo before we need to remove "future" states (needs to remove old states before doing new ones)
    if (historyPointer < orderHistory.length - 1) {
        orderHistory = orderHistory.slice(0, historyPointer+1);
    }

    //puts the copy at the end of the history array
    orderHistory.push(copy);
    historyPointer++;
}

//undo and redo function making it possible for the user to remove and take away items that
//have been in the order bag previously
function undoRedo(state){
    //check if the user wants to go forward or backward in the history array
    if (state == "1"){
        //if state is 1 - redo

        //Check that it is possible to move forward in the history states
        if(historyPointer < orderHistory.length - 1){

            //moves one way forward from the state previously shown
            historyPointer++;

            //takes the state of the "future" history state
            orderModel = orderHistory[historyPointer];

            //copy needed
            orderModel = JSON.parse(JSON.stringify(orderModel));
            orderView(orderModel);
        }

    } else if(state == "-1") {
        //if state is -1 - undo

        //Check that it is possible to move backward in the history states
        if(historyPointer > 0 ){
            historyPointer--;
            //moves one way backward from the state previously shown
            orderModel = orderHistory[historyPointer];
            orderModel = JSON.parse(JSON.stringify(orderModel));
            orderView(orderModel);
        }
    }
    changeOpacityUndoRedo();

}

function changeOpacityUndoRedo(){

    //change both buttons to active
    document.getElementById('redo').style.opacity = '0.2';
    document.getElementById('undo').style.opacity = '0.2';

    //check if the user is on either end of the history array
    if (historyPointer < orderHistory.length - 1){
        document.getElementById('redo').style.opacity = '1';
    }

    if (historyPointer > 0) {
        document.getElementById('undo').style.opacity = '1';
    }
    //Makes sure the user cant add more than 5 different items to the list of drinks
    changeButtonOpacity();


}




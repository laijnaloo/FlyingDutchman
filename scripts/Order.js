/**
 * Created by Anna on 2017-03-07.
 */


/*
 * addItemToModel(name, price)
 * orderView(orderModel)
 * addItemToOrder(name, price)
 * changeButtonOpacity()
 * createUserItemCount(div, count)
 *  createUserItemName(div, name)
 *  createUserItemDelete(div)
 *  createUserItemPrice(div, price)
 *  testText(text)
 *  calculateTotal()
 *  closure(func, image, name, price)
 */
/***I kassan ***/
var orderModel = {}
orderModel.orders = [];

function addItemToModel(name, price){
    //Checks if the drink already exists in the list of drinks
    var order = null;

    for (var i= 0; i < orderModel.orders.length; i++){
        if (orderModel.orders[i].name == name){
            //lays the object that is repeated into a variable and ends the loop
            order = orderModel.orders[i];
            break;
        }
    }

    if (order != null){
        //modifies already existing item in list
        order.count += 1;
    } else {

        //Creates new item in list with name, price and the first item
        var order = {};

        order.name = name;
        order.price = price;
        order.count = 1;
        orderModel.orders.push(order);
    }

    //copies the model and adds to history (for undo/redo)
    saveHistory();
}

//shows the information for the user in the order side
function orderView(orderModel) {
    var orderContent = document.getElementById("usersChosenItems");
    changeOpacityUndoRedo();

    // remove all elements
    while (orderContent.firstChild) {
        orderContent.removeChild(orderContent.firstChild);
    }

    for (var i = 0;i < orderModel.orders.length;i++) {
        var order = orderModel.orders[i];

        //create div that contains the specific drink on the order page
        var div = document.createElement("div");
        div.setAttribute("class", "userItems");

        //Create content for each drink
        createUserItemCount(div, order.count);
        createUserItemName(div, order.name);
        createUserItemDelete(div);
        createUserItemPrice(div, order.price);

        orderContent.appendChild(div);
    }
}

function addItemToOrder(name, price){
    //changes the display options so that it is visible that the user have items in the order list
    document.getElementById('orderWithoutItems').style.display = 'none';
    document.getElementById('orderWithItems').style.display = 'block';
    document.getElementById('sendOrder').style.display = 'block';


    var newName = name;
    //tests how wide the name is
    var nameWidth = testText(name);


    if(nameWidth > 150){
        //removes letters until the name is below 190px in widht so it can fit into the order page
        while  (nameWidth > 190){
            //takes away one letter at a time to make the word short enough to fit into the order page
            newName = newName.slice(0, -1);
            nameWidth = testText(newName);
        }

        //remove the last three letters and add ... instead to show that the word is longer than what can be seen
        newName = newName.slice(0, -3);
        newName = newName + "...";
    }



    if (orderModel.orders.length <= 5){

        //add item to the model to keep track of all the chosen items and from the model to the view to show it
        addItemToModel(newName, price);

        //updates HTML elements
        orderView(orderModel);
    }

    calculateTotal();
}

function changeButtonOpacity(){
    //changes the look of the interface depending on if the user can add more items to the order list or not
    var buttonArray = document.getElementsByClassName('orderButton');

    if ((orderModel.orders.length-1) > 4){
        //makes all buttons look unactive
        for (i = 0; i <buttonArray.length; i++ ){
            buttonArray[i].style.opacity = '0.3';
        }
        //popup telling the user what happend when there are to many different drinks.
        //Starts after 1 millisec to make the drink name visible before the popup appears
        setTimeout(function() {alert("You can only order 5 different drinks")}, 0.1);

    }else{
        //makes all buttons fully colored
        for (i = 0; i < buttonArray.length; i++) {
            buttonArray[i].style.opacity = '1';
        }
    }
}

function createUserItemCount(div, count){
    var drinkCount = document.createElement("P");
    drinkCount.setAttribute("class", "userItemCount");
    drinkCount.innerHTML = count;
    div.appendChild(drinkCount);
}

function createUserItemName(div, name){
    var drinkName = document.createElement("P");
    drinkName.setAttribute("class", "userItemName");
    drinkName.innerHTML = name;
    div.appendChild(drinkName);
}

function createUserItemDelete(div){
    var img = document.createElement("IMG");
    img.setAttribute("class", "userItemDelete");
    img.src = "images/x.png";
    div.appendChild(img);
}

function createUserItemPrice(div, price){
    var drinkPrice = document.createElement("P");
    drinkPrice.setAttribute("class", "userItemPrice");
    drinkPrice.innerHTML = price;
    div.appendChild(drinkPrice);
}

/*tests and returns the height of a given text*/
function testText(text){
    var testText = document.getElementById("letterTest");
    testText.innerHTML = text;
    testText.style.fontSize = "1.5em";
    var width = parseInt(testText.clientWidth + 1);
    return width;
}

//calculates the total amount of money the user have to pay for the order
function calculateTotal(){
    var totalPricePara = document.getElementById("totalPrice");
    var totalPrice = 0;

    for (var i= 0; i < orderModel.orders.length; i++) {
        //makes the price to a float
        totalPrice += parseFloat(orderModel.orders[i].price * orderModel.orders[i].count);

    }
    //Only show two decimals
    totalPrice = totalPrice.toFixed(2);

    //change the price that can be seen by the user
    totalPricePara.innerHTML = totalPrice + " KR";
}

//saves the variables and executes the function that needs
// (This is the problem solved: http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example)
function closure(func, image, name, price) {
    return function() {
        func(image, name, price);
    }
}

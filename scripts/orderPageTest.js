/**
 * Created by Lina Andersson on 2017-03-04.
 */

// run init after loading content
window.addEventListener("DOMContentLoaded", init, false);
var inventory;

// clears content for sorting
function removeCurrentContent(ID){
    var content = document.getElementById(ID);
    //console.log(content);
    if (content.hasChildNodes()) {
        for (var i = 0; i < content.childElementCount; i++) {
            content.removeChild(content.childNodes[i]);
        }
    }
}

function randomImg(){
    var images = ["images/Beer.png", "images/cider.png"];
    var randomNumber = Math.random() * 10;
    if (randomNumber<5){
        return images[0];
    }
    else{
        return images[1];
    }
}

function insertImage(divID){
    var source = randomImg();
    var img = document.createElement("IMG");
    img.setAttribute("class", "drinkPic");
    img.src = source;
    divID.appendChild(img);
    return source;
}

function createBeverageName(divID, inventory, i){
    var name = document.createElement("P");
    name.setAttribute("class", "namePara");

    //Give the names a new fontsize and fontfamily so it differs from the price
    name.style.fontSize = "1.3em";
    name.style.fontFamily = "roboto";
    var name_text = inventory[i].namn + " " + inventory[i].namn2;
    name.appendChild(document.createTextNode(name_text));
    divID.appendChild(name);
    return name_text;
}

function createBeveragePrice(divID, inventory, i) {
    var price = document.createElement("P");
    price.setAttribute("class", "pricePara");
    var price_text = document.createTextNode(inventory[i].price);
    price.appendChild(price_text);
    divID.appendChild(price);
    return inventory[i].price;
}

//creates a buy button below all the drinks on the order page
function createBuyButton(div, name, price){
    var buyButton = document.createElement("BUTTON");
    buyButton.setAttribute("class", "orderButton");
    buyButton.innerHTML = "Place Order"
    div.onclick = function(){
        addItemToOrder(name, price);
    };
    div.appendChild(buyButton);
}

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
        totalPrice += parseFloat(orderModel.orders[i].price);

    }
    //Only show two decimals
    totalPrice = totalPrice.toFixed(2);

    //change the price that can be seen by the user
    totalPricePara.innerHTML = totalPrice + " KR";
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

//saves the variables and executes the function that needs
// (This is the problem solved: http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example)
function closure(func, image, name, price) {
    return function() {
        func(image, name, price);
    }
}

// display inventory in HTML
function display_inventories(inventory){
    var tabcontent = document.getElementById("drinksList");

    removeCurrentContent("drinksList");
    var drinkNr = 0;
    for (var i = 0; i < inventory.length; i++) {
        if(inventory[i].namn != "" && inventory[i].count > 0) {

            //create div that contains the specific drink and all its information
            var div = document.createElement("div");
            div.setAttribute("class", "drinks");

            //create div that contains the specific drink and all its information except the buybutton
            var divInfo = document.createElement("div");
            divInfo.setAttribute("class", "drinksInfo");

            //set id for each drink
            var drinkID = "drink" + drinkNr.toString();
            div.setAttribute("id", drinkID);

            drinkNr++;

            var image = insertImage(divInfo);
            var name = createBeverageName(divInfo, inventory, i);
            var price = createBeveragePrice(divInfo, inventory, i);
            createBuyButton(div, name, price);

            //onclick (on image, price, name) a page with information about the drink appears
            divInfo.onclick = closure(showDrinkInfo, image, name, price);

            //place div info inside of div
            div.appendChild(divInfo);

            //Place div inside of drinklist div
            tabcontent.appendChild(div);
        }
    }
    setDraggable();
}

// sort the inventory list alphabetically
function show_beverages_alphabetical(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    //console.log(inventory);
    inventory.sort(function(a, b){if( a.name > b.name)
        return a;});
    //console.log(inventory);
    display_inventories(inventory);
    sortButtonsState("alph")
}

// sort the inventory list after amount in stock
function show_beverages_random(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.count - b.count});
    //console.log(inventory);
    display_inventories(inventory);
    sortButtonsState("pop")
}

// sort the inventory list after lowest price
function show_beverages_price(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.price - b.price});
    //console.log(inventory);
    display_inventories(inventory);
    sortButtonsState("price")
}

//show page with more info about the drink
function showDrinkInfo(image, name, price){

    //change from inventory view to page with info about the drink
    document.getElementById('inventoryPage').style.display = 'none';
    document.getElementById('infoPage').style.display = 'block';

    //rotate the arrow back as soon as the page is loaded
    rotation('leftArrow', 0);

    //show name, price and image of the element the user clicked on
    document.getElementById('recDrinkNameSortiment').innerHTML = name;
    document.getElementById('recDrinkPriceSortiment').innerHTML = price;
    document.getElementById("recDrink").src = image;
}

//when the user clicks the back arrow to get to the inventory the information page is taken away and the inventory is loaded again
function toInventory(){
    //change from info view to inventory view
    document.getElementById('inventoryPage').style.display = 'block';
    document.getElementById('infoPage').style.display = 'none';
}

//animation to get the arrow on the info page to rotate when the user enters the page.
var loop;
var degrees = 0;
function rotation(idName, speed){
    var image = document.getElementById(idName);

    //set css rotation degree
    image.style.transform = "rotate("+degrees+"deg)";

    //
    if(degrees < 180){
        //calls the function again to make it move slowly around itself
        loop = setTimeout('rotation(\''+idName+'\','+speed+')',speed);
        degrees+=3;
    } else {
        //reset when finished
        degrees = 0;
    }
}

//Make it possible to see which of the sorting buttons that are active
function sortButtonsState(buttonID){
    document.getElementById("alph").style.opacity = "0.6";
    document.getElementById("price").style.opacity = "0.6";
    document.getElementById("pop").style.opacity = "0.6";

    //change the opacity so that it is more on the active button
    if (buttonID == "alph"){
        document.getElementById("alph").style.opacity = "1";

    }else if (buttonID == "price"){
        document.getElementById("price").style.opacity = "1";

    }else if (buttonID == "pop"){
        document.getElementById("pop").style.opacity = "1";
    }
}

// run at start of page
function init(){
    get_beverages();
 $.ajax({ //Initial fetch of beverages
     type:'GET',
     url:'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
     dataType:'json',
     success:function (resp) {
     show_beverages_alphabetical(resp.payload);
     }
 });
}


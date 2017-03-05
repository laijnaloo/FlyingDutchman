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
function createBuyButton(div){
    var buyButton = document.createElement("BUTTON");
    buyButton.setAttribute("class", "orderButton");
    buyButton.innerHTML = "Place Order"
    div.appendChild(buyButton);
}

//
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
    for (var i = 0; i < inventory.length; i++){
        if(inventory[i].namn != "" && inventory[i].count > 0) {
            var div = document.createElement("div");
            div.setAttribute("class", "drinks");

            //set id for each drink
            var drinkID = "drink" + drinkNr.toString();
            div.setAttribute("id", drinkID);

            drinkNr++;

            var image = insertImage(div);
            var name = createBeverageName(div, inventory, i);
            var price = createBeveragePrice(div, inventory, i);
            createBuyButton(div);

            //onclick a page with information about the drink appears
            //div.setAttribute("onclick", "showDrinkInfo()");
            div.onclick = closure(showDrinkInfo, image, name, price);

            tabcontent.appendChild(div);
        }
    }
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
    show_beverages_alphabetical()
}


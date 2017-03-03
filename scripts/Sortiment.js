/**
 * Created by Anna on 2017-02-21.
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
}

function createBeverageName(divID, inventory, i){
    var name = document.createElement("P");
    name.setAttribute("class", "namePara");
    var name_text = document.createTextNode(inventory[i].namn + " " + inventory[i].namn2);
    name.appendChild(name_text);
    divID.appendChild(name);
}

function createBeveragePrice(divID, inventory, i) {
    var price = document.createElement("P");
    price.setAttribute("class", "pricePara");
    var price_text = document.createTextNode(inventory[i].price);
    price.appendChild(price_text);
    divID.appendChild(price);
}

// display inventory in HTML
function display_inventories(inventory){
    var tabcontent = document.getElementById("drinksList");
    removeCurrentContent("drinksList");
    for (var i = 0; i < inventory.length; i++){
        if(inventory[i].namn != "" && inventory[i].count > 0) {
            var div = document.createElement("div");
            div.setAttribute("class", "drinks");

            insertImage(div);
            createBeverageName(div, inventory, i);
            createBeveragePrice(div, inventory, i);

            tabcontent.appendChild(div);
            console.log(name);
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
}

// sort the inventory list after amount in stock
function show_beverages_random(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.count - b.count});
    //console.log(inventory);
    display_inventories(inventory);
}

// sort the inventory list after lowest price
function show_beverages_price(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.price - b.price});
    //console.log(inventory);
    display_inventories(inventory);

}

// run at start of page
function init(){
    get_beverages();
    show_beverages_alphabetical()
}
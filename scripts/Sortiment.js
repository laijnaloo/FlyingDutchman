/**
 * Created by Anna on 2017-02-21.
 */

window.addEventListener("DOMContentLoaded", init, false);
var inventory;

function display_inventories(invent){
    var tabcontent = document.getElementById("Beer");
    for (var i = 0; i < invent.length; i++){
        if(invent[i].namn != "" && invent[i].count > 0) {
            var div = document.createElement("div");
            var name = document.createElement("P");
            var name_text = document.createTextNode(invent[i].namn + " " + invent[i].namn2);
            var price = document.createElement("P");
            var price_text = document.createTextNode(invent[i].price);
            name.appendChild(name_text);
            price.appendChild(price_text);
            div.appendChild(name);
            div.appendChild(price);
            tabcontent.appendChild(div);
        }
    }
}

function show_beverages_alphabetical(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
   // console.log(inventory);
    inventory.sort(function(a, b){if( a.name > b.name)
        return a;});
    console.log(inventory);
    display_inventories(inventory);
}

function show_beverages_random(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.count - b.count});
    console.log(inventory);
    display_inventories(inventory);
}

function show_beverages_price(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.price - b.price});
    console.log(inventory);
    display_inventories(inventory);

}

function init(){
    inventory = get_beverages();
    show_beverages_random();
}
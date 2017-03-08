/**
 * Created by Lina Andersson on 2017-03-04.
 */


/*
 * CONTAINS FUNCTIONS
 * toInventory()
 * display_inventories_with_button(inventory)
 * show_beverages_alphabetical_w_button()
 * show_beverages_random_w_button()
 * show_beverages_price_w_button()
 * createBuyButton(div, name, price)
 * */

// run init after loading content
window.addEventListener("DOMContentLoaded", init, false);
var inventory;

/***Show content***/

//when the user clicks the back arrow to get to the inventory the information page is taken away and the inventory is loaded again
function toInventory(){
    //change from info view to inventory view
    document.getElementById('inventoryPage').style.display = 'block';
    document.getElementById('infoPage').style.display = 'none';
}

// display inventory in HTML
function display_inventories_with_button(inventory){
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
function show_beverages_alphabetical_w_button(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    //console.log(inventory);
    inventory.sort(function(a, b){if( a.name > b.name)
        return a;});
    //console.log(inventory);
    display_inventories_with_button(inventory);
    sortButtonsState("alph")
}

// sort the inventory list after amount in stock
function show_beverages_random_w_button(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.count - b.count});
    //console.log(inventory);
    display_inventories_with_button(inventory);
    sortButtonsState("pop")
}

// sort the inventory list after lowest price
function show_beverages_price_w_button(){
    var temp_inventory = sessionStorage.getItem("Inventory");
    inventory = JSON.parse(temp_inventory);
    // console.log(inventory);
    inventory.sort(function(a, b){return a.price - b.price});
    //console.log(inventory);
    display_inventories_with_button(inventory);
    sortButtonsState("price")
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


//Displays the current user and the users assets at the top of the orderBox.
function displayCurrentUser() {
    if(sessionStorage.getItem("Firstname") != null) {
        var firstName = sessionStorage.getItem("Firstname");
        var lastName = sessionStorage.getItem("Lastname");
        var assets = sessionStorage.getItem("Assets");
        document.getElementById("currentUser").innerText = firstName + " " + lastName + "\n Saldo: " + assets;
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
         show_beverages_alphabetical_w_button(resp.payload);
         }
    });
    displayCurrentUser();
}


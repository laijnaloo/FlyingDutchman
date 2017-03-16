/**
 * Created by Tobbe on 2017-03-07.
 */

// Run init after loading content
function init() {

    //Fetches all the users from the database using the "iou_get_all" call.
    db_action("jorass", "jorass", "iou_get_all", function(resp){
        if(resp.type = "iou_get_all") { //If return type is "iou_get_all" it has successfully retrieved the users
            allUsers = resp.payload;
            console.log(allUsers);
            printUsers(allUsers);
        }

    });
}
//Create username and append it to the div
function createUserName(divID, inventory, i){
    var name = document.createElement("P");
    name.setAttribute("class", "name");
    name.style.fontSize = "1.2em";
    name.style.fontFamily = "roboto";
    name.style.color = "#76a3b6";
    var name_text = allUsers[i].first_name + " " + allUsers[i].last_name;
    name.appendChild(document.createTextNode(name_text));

    divID.appendChild(name);
}

//Create user assets and append it to the div
function createUserAssets(divID, allUsers, i) {
    var assets = document.createElement("P");
    assets.setAttribute("class", "name");
    var asset_text = document.createTextNode("Assets: " + allUsers[i].assets);
    assets.appendChild(asset_text);

    divID.appendChild(assets);
}


// display users in HTML
function printUsers(allUsers) {

    var tabcontent = document.getElementById("allUsers");
    for (var i = 0; i < allUsers.length; i++){
        if(allUsers[i].first_name != "") {

            //Creates div and sets attributes to it
            var div = document.createElement("div");
            div.setAttribute("class", "users");
            div.setAttribute("onclick", "editUser()");
            div.style.borderRadius = "5px";
            div.style.borderStyle = "solid";
            div.style.borderColor = "#76a3b6";

            //Append username and assets to div
            createUserName(div, allUsers, i);
            createUserAssets(div, allUsers, i);

            //Append div to HTML
            tabcontent.appendChild(div);
        }
    }


}


//When all DOM content is loaded, run init
window.addEventListener("DOMContentLoaded", init, false);
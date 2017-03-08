/**
 * Created by Tobbe on 2017-03-07.
 */

function init() {

    db_action("jorass", "jorass", "iou_get_all", function(resp){
        if(resp.type = "iou_get_all") {
            allUsers = resp.payload;
            console.log(allUsers);
            printUsers(allUsers);
        }

    });
}

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

function createUserAssets(divID, allUsers, i) {
    var assets = document.createElement("P");
    assets.setAttribute("class", "name");
    var asset_text = document.createTextNode("Assets: " + allUsers[i].assets);
    assets.appendChild(asset_text);
    divID.appendChild(assets);
}



function printUsers(allUsers) {

    var tabcontent = document.getElementById("allUsers");
    for (var i = 0; i < allUsers.length; i++){
        if(allUsers[i].first_name != "") {
            var div = document.createElement("div");
            div.setAttribute("class", "users");
            div.setAttribute("onclick", "editUser()");
            div.style.borderRadius = "5px";
            div.style.borderStyle = "solid";
            div.style.borderColor = "#76a3b6";

            createUserName(div, allUsers, i);
            createUserAssets(div, allUsers, i);
            tabcontent.appendChild(div);
        }
    }


}

window.addEventListener("DOMContentLoaded", init, false);
/**
 * Created by Tobbe on 2017-02-17.
 */

var unameField;
var pwField;
var uname;
var password;

function init() {
    unameField = document.getElementById("unameLoginOption");
    pwField = document.getElementById("passwordLoginOption");
}



function login() {
    sessionStorage.clear();
    uname = unameField.value;
    password = pwField.value;
    db_action(uname, password,"iou_get",function(result) {
        if (result.type == "iou_get") {
            sessionStorage.setItem("User", uname);
            sessionStorage.setItem("Firstname", result.payload[0].first_name);
            sessionStorage.setItem("Lastname", result.payload[0].last_name);
            sessionStorage.setItem("Assets", result.payload[0].assets);
            location = "staffView.html";
        } else {

            alert("Invalid username or password");
        }

    });

}

window.addEventListener("DOMContentLoaded", init, false);

/**
 * Created by Tobbe on 2017-02-17.
 */

var unameField;
var pwField;
var uname;
var password;
var admins = ["ervtod", "jorass", "saskru", "hirchr", "svetor"]; //List of administrators in the system.

//Finds and sets the username and password field to variables.
function init() {
    unameField = document.getElementById("unameLoginOption");
    pwField = document.getElementById("passwordLoginOption");
}


//Attempts to log in a user with the username - password combination corresponding to the parameters given in the
// username and password field.
function login() {

    sessionStorage.clear(); //Clears sessionStorage
    uname = unameField.value; //Reads text in unameField
    password = pwField.value; //Reads text in pwField

    db_action(uname, password,"iou_get",function(result) {
        if (result.type == "iou_get") { //If return type is "iou_get" a user was found in the database

            //Stores info about the user in sessionStorage for later use.
            sessionStorage.setItem("User", uname);
            sessionStorage.setItem("Firstname", result.payload[0].first_name);
            sessionStorage.setItem("Lastname", result.payload[0].last_name);
            sessionStorage.setItem("Assets", result.payload[0].assets);

            //Moves the user to location "staffView.html" if it is an admin, "orderPageTest.html" otherwise.
            if(admins.indexOf(uname) > -1) {
                location = "staffView.html";
            } else {
                location = "orderPageTest.html"
            }
        } else {
            alert("Invalid username or password"); //No user with the given username - password combination was found.
        }

    });

}

window.addEventListener("DOMContentLoaded", init, false);

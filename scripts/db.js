

var DB_URL = "http://pub.jamaica-inn.net/fpdb/api.php"; //Database URL

//Sends a XMLHttpRequest to the database url set in the variable DB_URL. The request is specified by the arguments (uname, password and action).
//When the request is finished it will execute the function (callback) which is sent in as an argument.
function db_action(uname, password, action, callback) {

    var xhr = new XMLHttpRequest();
    var reqURL = DB_URL+"?action="+action+"&username="+uname+"&password="+password; //Create request string
    xhr.open("GET", reqURL, true); //Initializes the request
    xhr.send(); //Send XMLHttpRequest

    xhr.onreadystatechange = function () { //Runs when the readystate on the XMLHttpRequest changes
        if (xhr.readyState === 4 && xhr.status === 200) { //readyState === 4 means that the XMLHttpRequest is DONE. The same with status === 200.
            var resp = JSON.parse(xhr.responseText); //Parse the response
            callback(resp); //Executes the code which was sent in as an argument (callback) with the response from the XMLHttpRequest as argument.
        }
    }
}



//Fetches all the beverages from the database using the "inventory_get" call.
function get_beverages(){
    db_action("jorass", "jorass", "inventory_get", function(invent){ //If return type is "inventory_get" it has successfully retrieved the beverages.
        if(invent.type = "inventory_get") {
            sessionStorage.setItem("Inventory", JSON.stringify(invent.payload)); //Stores the list with json items of beer in sessionStorage
        }

    });
}
/*
function get_all_users() {
    db_action("jorass", "jorass", "iou_get_all", function(invent){
        if(invent.type = "iou_get_all") {
            sessionStorage.setItem("all_users", JSON.stringify(invent.payload));
        }
    });
}
*/
/**
 * Created by Tobbe on 2017-02-15.
 */

var DB_URL = "http://pub.jamaica-inn.net/fpdb/api.php"

function db_action(uname, password, action, callback) {

    var xhr = new XMLHttpRequest();
    var reqURL = DB_URL+"?action="+action+"&username="+uname+"&password="+password;
    xhr.open("GET", reqURL, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resp = JSON.parse(xhr.responseText);
            callback(resp);
        }
    }
}

/* By Anna (with help from Tobias) */
function get_beverages(){
    db_action("jorass", "jorass", "inventory_get", function(invent){
        if(invent.type = "inventory_get") {
            sessionStorage.setItem("Inventory", JSON.stringify(invent.payload)); //List w. json items of beer
        }

    });
}

function get_all_users() {
    db_action("jorass", "jorass", "iou_get_all", function(invent){
        if(invent.type = "iou_get_all") {
            sessionStorage.setItem("all_users", JSON.stringify(invent.payload));
        }
    });
}

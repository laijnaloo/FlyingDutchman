/**
 * Created by Tobbe on 2017-02-15.
 */

var DB_URL = "http://pub.jamaica-inn.net/fpdb/api.php";

function db_action() { //Ska ta emot argument
    var uname = "jorass";
    var password = "jorass";
    var action = "user_get_all";

    var xhr = new XMLHttpRequest();
    var reqURL = DB_URL+"?username="+uname+"&password="+password+"&action="+action;
    xhr.open("GET", reqURL, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            return resp;
        }
    };
    xhr.send();
}


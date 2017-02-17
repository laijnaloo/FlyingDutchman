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
            console.log(resp);
            callback(resp);
        }
    }


}


/*
*
* KOMMENTAR 1: Denna fil är för att kunna ändra språk! Koden är mest för att testa strukturen, så den ska skrivas om
* till lite bättre kod! Tanken är väl att texterna för sidan inte ska hårdkodas
*
* KOMMENTAR 2: Cookies har implementeras, så måste köras via MAMP för att det ska funka korrekt
*
* KOMMENTAR 3: Bug i hur flaggorna fadeas!!
*
* */

$(document).ready(function(){

    var lang = getCookie("language");

    $("#welcome").text(translate("welcome-string",lang));
    $("#sortiment").text(translate("sort",lang));
    $("#login").text(translate("login",lang));
    $("#staffOption").text(translate("staff",lang));
    $("#logintext").text(translate("login",lang));
    $("#back").text(translate("back",lang));
    $("#log").text(translate("login",lang));

    if (lang ="sv"){
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);

    }else{
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);
    }

    $("#sv").click(function(){
        $("#en").fadeTo("fast", 0.20);
        $("#sv").fadeTo("fast", 1);

        deleteCookie("language");
        setCookie("language","sv",365);
        $("#welcome").text(translate("welcome-string","sv"));
        $("#sortiment").text(translate("sort","sv"));
        $("#login").text(translate("login","sv"));
        $("#staffOption").text(translate("staff","sv"));
        $("#logintext").text(translate("login","sv"));
        $("#back").text(translate("back","sv"));
        $("#log").text(translate("login","sv"));

    });

    $("#en").click(function(){
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);

        deleteCookie("language");
        setCookie("language","en",365);

        $("#welcome").text(translate("welcome-string","en"));
        $("#sortiment").text(translate("sort","en"));
        $("#login").text(translate("login","en"));
        $("#staffOption").text(translate("staff","en"));
        $("#logintext").text(translate("login","en"));
        $("#back").text(translate("back","en"));
        $("#log").text(translate("login","en"));
    });
});

function deleteCookie(name){
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var lang = getCookie("language");
    if (lang == "") {
         setCookie("language", "sv", 365);
        $("#en").fadeTo("fast", 0.20);
    }
}

function translate(string, language){

    operation = ["welcome-string","sort","login","staff","back"];
    swedish = ["Välkommen","Sortiment","Logga in","Personal","Tillbaka"];
    english = ["Welcome","Collections","Login","Staff","Back"];

    var i=0;
    for (i;i<=operation.length;i++){
        if (operation[i] == string){
            if (language == "en")
            {
                return english[i];
            } else {
                return swedish[i];
            }
        }
    }
}
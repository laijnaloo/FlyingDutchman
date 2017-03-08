$(document).ready(function(){

    if(localStorage.getItem("language")==undefined) {
        localStorage.setItem("language", "sv");
    }

    var lang = localStorage.getItem("language");
    writeData(lang);
    fade(lang);

    $("#sv").click(function(){

        localStorage.setItem("language", "sv");
        lang = localStorage.getItem("language");
        writeData(lang);
        setPlaceholder();
        fade(lang);

    });

    $("#en").click(function(){
        localStorage.setItem("language", "en");
        lang = localStorage.getItem("language");
        writeData(lang);
        setPlaceholder();
        fade(lang);h
    });
});

function getData(string,language,place,file) {
    $.ajax({
        url: file,
        dataType: "text",
        success: function (data) {
            var d = data;
            var options = d.split(";");
            var i=0;


            for (i; i <= options.length; i++) {
                var option = [];
                option = options[i].split(',');
                if (option[0] == string) {
                    if (language == "en") {
                        $(place).html(option[2]);
                        } else {
                            $(place).html(option[1]);

                        }
                    }
                }
            }
    });
}

function getFile(file,place){
    $.ajax({
        url: file,
        dataType: "text",
        success: function (data) {
            $(place).html(data);
        }
    });
}

function writeData(lang) {
    // First Page
    getData("welcome-string",lang,"#welcome","data/firstpage.txt");
    getData("sort",lang,"#sortiment","data/firstpage.txt");
    getData("login",lang,"#login","data/firstpage.txt");
    getData("staff",lang,"#staffOption","data/firstpage.txt");

    //Login Page
    getData("login",lang,"#logintext","data/firstpage.txt");
    getData("back",lang,"#back","data/firstpage.txt");
    getData("login",lang,"#loginButton","data/firstpage.txt");
    getData("stafflogin",lang,"#staffLogintext","data/firstpage.txt");

    // Collection page

    getData("drinks",lang,"#Drinks","data/tabs.txt");
    getData("events",lang,"#Events","data/tabs.txt");
    getData("about",lang,"#About","data/tabs.txt");
    getData("back",lang,"#logoutButton","data/tabs.txt");

    getData("pop",lang,"#pop","data/tabs.txt");
    getData("price",lang,"#price","data/tabs.txt");

    if(lang =='en') {
        getFile("data/aboutEn.txt", "#aboutFlying");
        getFile("data/singingFarmersEn.txt","#singingFarmers");
        getFile("data/beerTastingEn.txt","#beerTasting");
        getFile("data/ladiesNightEn.txt","#ladiesNight");

    }else {
        getFile("data/aboutSv.txt", "#aboutFlying");
        getFile("data/singingFarmersSv.txt","#singingFarmers");
        getFile("data/beerTastingSv.txt","#beerTasting");
        getFile("data/ladiesNightSv.txt","#ladiesNight");
    }
}

function setPlaceholder(){
    lang = localStorage.getItem("language");

    if (lang == "en"){
        document.getElementsByName('user')[0].placeholder='Username';
        document.getElementsByName('password')[0].placeholder='Password';
    }else{
        document.getElementsByName('user')[0].placeholder='Användarnamn';
        document.getElementsByName('password')[0].placeholder='Lösenord';
    }
}

function fade(lang){
    if (lang =="en"){
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);

    }else{
        $("#sv").fadeTo("fast", 1);
        $("#en").fadeTo("fast", 0.20);
    }
}
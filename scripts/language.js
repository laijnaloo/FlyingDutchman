$(document).ready(function(){

    if(localStorage.getItem("language")==undefined) {
        localStorage.setItem("language", "sv    ");
    }

    var lang = localStorage.getItem("language");

    writeData(lang);



    if (lang =="en"){
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);

    }else{
        $("#sv").fadeTo("fast", 1);
        $("#en").fadeTo("fast", 0.20);
    }


    $("#sv").click(function(){
        $("#en").fadeTo("fast", 0.20);
        $("#sv").fadeTo("fast", 1);

        localStorage.setItem("language", "sv");
        lang = localStorage.getItem("language");
        writeData(lang);

    });

    $("#en").click(function(){
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);

        localStorage.setItem("language", "en");
        lang = localStorage.getItem("language");
        writeData(lang);
    });
});

function getData(string,language,place) {
    $.ajax({
        url: "test.txt",
        dataType: "text",
        success: function (data) {
            var d = data;
            var options = d.split(";");
            var i=0;

            for (i;i<=options.length;i++){
                var option = [];
                option = options[i].split(',');
                if (option[0] == string){
                    if (language == "en")
                    {
                        $(place).html(option[2]);

                    } else{
                        $(place).text(option[1]);

                    }
                }
            }
        }
    });
}

function writeData(lang) {
    // First Page
    getData("welcome-string",lang,"#welcome");
    getData("sort",lang,"#sortiment");
    getData("login",lang,"#login");
    getData("staff",lang,"#staffOption");

    //Login Page
    getData("login",lang,"#logintext");
    getData("back",lang,"#back");
    getData("login",lang,"#login");
}
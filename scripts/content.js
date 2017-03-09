/*
 * File: content.js
 *
 * This file contains functions that handles the content of the website
 * in different language.
 */

/**
 * This function will run every time a page is loaded and wait for a click on one of the flags. A click on a flag
 * will change the language of the site.
 */
$(document).ready(function(){

    // If the language hasn't been set, then will it per default set it to be swedish.
    if(localStorage.getItem("language")==undefined) {
        localStorage.setItem("language", "sv");
    }

    // Here is the current language collected from the storage and all the data is written out on the website.
    // The flags will also be faded.
    var lang = localStorage.getItem("language");
    writeData(lang);
    fade(lang);

    // If the Swedish flag is clicked, then the content will be written in Swedish on the website.
    $("#sv").click(function(){

        localStorage.setItem("language", "sv");
        lang = localStorage.getItem("language");
        writeData(lang);
        setPlaceholder();
        fade(lang);
    });

    // If the English flag is clicked, then the content will be written in English on the website.
    $("#en").click(function(){
        localStorage.setItem("language", "en");
        lang = localStorage.getItem("language");
        writeData(lang);
        setPlaceholder();
        fade(lang);
    });
});

/*
 * This function reads from a .txt file that contains a swedish and english translation of all the buttons etc.
 * The .txt file is made so we have a keyword that says which text is going to be written out, a swedish translation and
 * then the English one. These are divided with a ",": string,swedish,english. Each of these block is divided with a ";"
 * So we got block1;block2;block3 ... etc. Where each block is [string,swedish,english]
 *
 * @param string - the string search for
 * @param language - the current language
 * @param place - where the output shall be written
 * @param file - the file to get the data from
 */
function getData(string,language,place,file) {
    $.ajax({
        url: file,
        dataType: "text",
        success: function (data) {

            // take the data from the text and split it where there is a ";" This means each element in the array
            // will look like [String,Sv,En] where string is the keyword we want to add to the output, Sv is the swedish
            // translation and En is the English one.
            var d = data;
            var options = d.split(";");
            var i=0;

            // Go through every element in options and split it where there is a ",". This means we have a element where
            // the first element is the keyword, the second is the swedish translation, and the third is the English
            for (i; i <= options.length; i++) {
                var option = [];
                option = options[i].split(',');

                // If the keyword is equal to the string then we check the language.
                if (option[0] == string) {
                    //If the language is english then we will write the 3rd element, which is the english translation
                    if (language == "en") {
                        $(place).html(option[2]);
                        }
                        // Otherwise we write the swedish translation, which is on the 2nd element.
                        else {
                            $(place).html(option[1]);

                        }
                    }
                }
            }
    });
}

/*
 * This function writes all the content to from a .txt file into the html page.
 *
 * @param file - the file to write from.
 * @place - the place in the html file to put the content from the file.
 */
function getFile(file,place){
    $.ajax({
        url: file,
        dataType: "text",
        success: function (data) {
            $(place).html(data);
        }
    });
}
/*
 * This function coordinates what content that shall be collected from the .txt files and where to put them in the html
 * files.
 *
 * @param lang - the language that are set for the webpage
 */
function writeData(lang) {
    // FIRST PAGE: Sets the welcome text on the first page
    getData("welcome-string",lang,"#welcome","data/firstpage.txt");

    // FIRST PAGE: Sets the sortiment button on the first page
    getData("sort",lang,"#sortiment","data/firstpage.txt");

    // FIRST PAGE: sets the login button on the first page
    getData("login",lang,"#login","data/firstpage.txt");

    // LOGIN PAGE: Sets the login text on the login page
    getData("login",lang,"#logintext","data/firstpage.txt");

    // LOGIN: PAGE: Sets the back button on the login page
    getData("back",lang,"#back","data/firstpage.txt");

    // LOGIN PAGE: sets the loginbutton on the login page
    getData("login",lang,"#loginButton","data/firstpage.txt");

    // SORTIMENT/ORDER PAGE: Sets the Drink tab
    getData("drinks",lang,"#Drinks","data/tabs.txt");

    // SORTIMENT/ORDER PAGE:set the Event tab
    getData("events",lang,"#Events","data/tabs.txt");

    // SORTIMENT/ORDER PAGE: set the about tab
    getData("about",lang,"#About","data/tabs.txt");

    // SORTIMENT/ORDER PAGE: set the logout button
    getData("back",lang,"#logoutButton","data/tabs.txt");

    // SORTIMENT/ORDER PAGE:set the popularity sort-button
    getData("pop",lang,"#pop","data/tabs.txt");

    // SORTIMENT/ORDER PAGE: Set the price sort-button
    getData("price",lang,"#price","data/tabs.txt");

    // ORDER PAGE: set the header in the order box
    getData("orderHeader",lang,"#orderHeader","data/tabs.txt");

    // ORDER PAGE: set the text in the order box
    getData("noOrderText",lang,"#noItemsText","data/tabs.txt");

    // ORDER PAGE: set the text in the send order box
    getData("sendOrder",lang,"#sendOrder","data/tabs.txt");

    // ORDER PAGE: set the text in the put order window
    getData("recDrinkBuy",lang,"#recDrinkBuy","data/tabs.txt");

    // STAFF PAGE: set the text in the customer tab
    getData("customer",lang,"#Customers","data/tabs.txt");

    // STAFF PAGE: set the text in the collection tab
    getData("sort",lang,"#Collection","data/firstpage.txt");

    // STAFF PAGE: set the text in the setting tab
    getData("setting",lang,"#Settings","data/tabs.txt");

    // This set the english content of the about page and the 3 different events
    if(lang =='en') {
        getFile("data/aboutEn.txt", "#aboutFlying");
        getFile("data/singingFarmersEn.txt","#singingFarmers");
        getFile("data/beerTastingEn.txt","#beerTasting");
        getFile("data/ladiesNightEn.txt","#ladiesNight");
    }

    // This set the swedish content of the about page and the 3 different events
    else {
        getFile("data/aboutSv.txt", "#aboutFlying");
        getFile("data/singingFarmersSv.txt","#singingFarmers");
        getFile("data/beerTastingSv.txt","#beerTasting");
        getFile("data/ladiesNightSv.txt","#ladiesNight");
    }
}

/*
 * This function sets the placeholder on the login page
 */
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

/*
 * This function fades the flags on the webpage
 *
 * @param lang - the language
 */
function fade(lang){
    if (lang =="en"){
        $("#sv").fadeTo("fast", 0.20);
        $("#en").fadeTo("fast", 1);

    }else{
        $("#sv").fadeTo("fast", 1);
        $("#en").fadeTo("fast", 0.20);
    }
}
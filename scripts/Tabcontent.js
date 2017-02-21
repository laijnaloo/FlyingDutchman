
//Created by Anna
function openTab(event, title, linkTitle){
	var tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabContent");
	//Hide all tabcontent
	for (var i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// removes the class "active from tabs"
	tablinks = document.getElementsByClassName("tabTitle");
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	//show the chosen class and make it active
	document.getElementById(title).style.display = "block";
	event.currentTarget.className += " active";

	//change z-index on tab
	document.getElementById(linkTitle).style.zIndex = "10";
}

function changeLanguage(language){

	//change opacity of the flag image
	if (language == 'en'){
		document.getElementById("sv").style.opacity = "0.5";
		document.getElementById("en").style.opacity = "1";
	} else {
		document.getElementById("en").style.opacity = "0.5";
		document.getElementById("sv").style.opacity = "1";
	}
}
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

//Changes the cpunter in the page with specific information about drinks
function countDrinks(change){
	var counterNr = countNumber.innerHTML; //Get the current count
	if (change=='-1') { //If minus is pressed
		if (counterNr != '1') { //If the count isn't one (the lowest possible count)
			countNumber.innerHTML = parseInt(counterNr) - 1; //Lower the current count by one
			document.getElementById("plus").style.opacity = "1"; //Makes sure the plus is clearly visible
			if (countNumber.innerHTML == '1') {
				//If count is 1 (lowest possible) Make the minus sign change opacity
				document.getElementById("minus").style.opacity = "0.5";
			}
		}
	} else {
		if (counterNr != '9') { //if plus is pressed and the current count is lower than 9 (the highest possible)
			countNumber.innerHTML = parseInt(counterNr) + 1;
			document.getElementById("minus").style.opacity = "1"; //make sure the minus sign is visible

			if (countNumber.innerHTML == '9'){
				//If count is 9 (highest possible) Make the plus sign change opacity
				document.getElementById("plus").style.opacity = "0.5";
			}
		}
	}
}


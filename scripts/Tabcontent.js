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

function countDrinks(change){
	var counterNr = countNumber.innerHTML;
	if (change=='-1') {
		if (counterNr != '1') {
			countNumber.innerHTML = parseInt(counterNr) - 1;
			document.getElementById("plus").style.opacity = "1";
			if (countNumber.innerHTML == '1') {
				document.getElementById("minus").style.opacity = "0.5";
			}
		}
	} else {
		if (counterNr != '9') {
			countNumber.innerHTML = parseInt(counterNr) + 1;
			document.getElementById("minus").style.opacity = "1";

			if (countNumber.innerHTML == '9'){
				document.getElementById("plus").style.opacity = "0.5";
			}
		}
	}
}


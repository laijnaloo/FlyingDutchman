function openTab(event, title){
	var tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabContent");
//Hide all tabcontent
	for (var i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tabTitle");
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(title).style.display = "block";
	event.currentTarget.className += " active";
}
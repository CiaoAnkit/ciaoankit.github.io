/* localStorage Begins */
	// Check if localStorage is disabled.
	function lsTest(){
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}

	if(lsTest() === false){
		alert("It is necessary to enable 'localStorage' property (commonly found under Cookies) for the functionality of this website. Please enable it and refresh the page for seamless navigation throughout this website.");
	}
/* localStorage Ends */

/* Header Begins */
document.getElementById("header_area_id").innerHTML +=  "\
	<div class=\"logo\">\
	<a id=\"logo_iiit\" target=\"_blank\" href=\"https://www.iiit.ac.in/\"><img src=\"./images/iiit.png\" alt=\"IIITH\"></a> \
	<a id=\"logo_sypy\" target=\"_blank\" href=\"https://sypy.iiit.ac.in/\"><img src=\"./images/SyPyRG.svg\" alt=\"SyPy\"></a> \
	<a id=\"logo_cstar\" target=\"_blank\" href=\"https://cstar.iiit.ac.in/\"><img src=\"./images/cstar.png\" alt=\"CSTAR\"></a> \
	</div>\
	\
	<center><!--<br><br>\
		<div style=\"font-size: +50; font-family: monospace; margin-left: 13px; margin-right: 13px;\">\
			<a href=\"./index.html\" style=\"color: #980000\">DR. ANKIT GANGWAL</a>\
		</div>\
	<br>--></center>\
	";
/* Header Ends */

/* Menu Begins */
	document.getElementById("menu_bar_div").innerHTML += "\
	<ul class=\"headerUl\">\
		<li id=\"index\"><a href=\"./index.html\"><i class=\"fas fa-home\"></i></a></li>\
		<li class=\"menu_bar_li\"> <a href=\"javascript:void(0)\" onclick=\"ResponsiveMenuBar()\" id=\"menu_bar_link\"><i class=\"fas fa-bars\" id=\"menu_bar_icon\"></i></a></li>\
		<li id=\"research\"><a href=\"./research.html\">Research</a></li>\
		<li id=\"publications\"><a href=\"./publications.html\">Publications</a></li>\
		<li id=\"teaching\"><a href=\"./teaching.html\">Teaching & Students</a></li>\
		<li style=\"margin-left: auto;\" class=\"closed\" id=\"dropdown_li\"><a href=\"javascript:void(0)\" onclick=\"ToggleDropDown()\">Misc. Information<i class=\"fas fa-caret-down\" style=\"margin-left: -4px;\" id=\"dropdown_caret_icon\"></i></a>\
			<ul class=\"dropdown\">\
				<li id=\"analytics\"><a href=\"./analytics.html\">Analytics</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"clock\"><a href=\"./clock.html\">Clock</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"media\"><a href=\"./media.html\">Media Coverage</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"timeline\"><a href=\"./timeline.html\">My Timeline</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"news\"><a href=\"./news.html\">News Archive</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"italy\"><a href=\"./isitalydov.html\">Travel IT DoV</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"nl\"><a href=\"./isnltev.html\">Travel NL TEV</a></li>\
				<div style=\"font-size:0;height:15px;\">&nbsp;</div>\
				<li id=\"usa\"><a href=\"./isusaj1.html\">Travel USA J1</a></li>\
			</ul>\
		</li>\
	</ul>\
	";
	document.getElementById(MenuPageName).getElementsByTagName('a')[0].classList.add("active");
	document.getElementById(MenuPageName).getElementsByTagName('a')[0].href = "javascript:void(0)";

	if (MenuDropDown_full) {
		document.getElementById("dropdown_li").getElementsByTagName('a')[0].classList.add("active");
	}
	if (MenuDropDown_mini) {
		document.getElementById("menu_bar_link").style.backgroundColor= "#400000";
	}
/* Menu Ends */

/* Footer Begins */
	var update_date = "";
	const today = new Date();

	if (footer_id == 1) {
		update_date = "November 11, 2025";
	}

	if (footer_id == 2) {
		update_date = "November 07, 2016";
	}

	if (footer_id == 3) {
		update_date = "April 15, 2019";
	}

	if (footer_id == 4) {
		update_date = "July 01, 2020";
	}

	document.getElementById("footer").innerHTML +=  "\
	Last updated (with<i class=\"fas fa-heart\"></i>&<i class=\"fas fa-coffee\"></i>) on " + update_date + "\
	<br>\
	A_G\ &#169; 2016 - " + today.getFullYear() + "\
	";
/* Footer Ends */

/* returnToTop Begins */
	// When the user scrolls down 175px from the top of the document, show the button
	window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
	  if (document.body.scrollTop > 175 || document.documentElement.scrollTop > 175) {
	    document.getElementById("topbtn").style.display = "block";
	  } else {
	    document.getElementById("topbtn").style.display = "none";
	  }
	}
	// When the user clicks on the button, scroll to the top of the document
	function topFunction() {
	  document.body.scrollTop = 0;
	  document.documentElement.scrollTop = 0;
	}
/* returnToTop Ends */

/* DarkMode Begins */
	if(lsTest() === true){ // Only load darkmode options when localStorage available
		var toggle = document.getElementById("darkmodebtn");
		var darkTheme = document.getElementById("dark-mode-theme");
		toggle.style.display = "block";

		// Clear on startup when expired
		let savedTime = localStorage.getItem('savedTime');
		if (savedTime && (new Date().getTime() - savedTime > 3 * 60 * 60 * 1000)) { //expire time = 3 hours
		  localStorage.clear(); // clears ENTIRE the localStorage
		}

		// For the first time visitors, set theme according to the local time
		if (localStorage.getItem("dark-mode-storage") === null){
			//let date = new Date("July 21, 1983 17:15:00");
			let hour = new Date().getHours();
			if (hour > 17 || hour < 8){ // Dark mode from 1800 until 0800
			  setTheme("dark");
			}  
			else {
			  setTheme("light");
			}
		}
		else{
			// Set theme to "last_theme || light"
			var savedTheme = localStorage.getItem("dark-mode-storage") || "light";
			setTheme(savedTheme);
		}

		toggle.addEventListener("click", () => {
		    if (toggle.checkdarkmode === "1") {
		        setTheme("dark");
		    } else if (toggle.checkdarkmode === "0") {
		        setTheme("light");
		    }
		});

		function setTheme(mode) {
		    localStorage.setItem("dark-mode-storage", mode);
		    localStorage.setItem('savedTime', new Date().getTime());

		    if (mode === "dark") {
		        darkTheme.disabled = false;
		        toggle.checkdarkmode = "0";
		        toggle.childNodes[0].className = "fas fa-sun";
		    } else if (mode === "light") {
		        darkTheme.disabled = true;
		        toggle.checkdarkmode = "1";
		        toggle.childNodes[0].className = "fas fa-moon";
		    }
		}
	}
/* DarkMode Ends */

/* ToggleBibTeX Begins */
	function toggle_cite(id){
		var e = document.getElementById(id);
	        if (e.classList.contains ('BibTeX_shown')){
	        	 e.classList.remove ('BibTeX_shown'); 
	             e.classList.add ('BibTeX_hidden');
	        }
	        else
	        {
	            e.classList.remove ('BibTeX_hidden');
	            e.classList.add ('BibTeX_shown'); 
	        }
	}
/* ToggleBibTeX Ends */

/* loadTeachingCourse Begins */
	function includeHTML() {
		var z, i, elmnt, file, xhttp;
		/* Loop through a collection of all HTML elements */
		z = document.getElementsByTagName("*");
		for (i = 0; i < z.length; i++) {
			elmnt = z[i];
			/* Search for elements with a certain atrribute */
			file = elmnt.getAttribute("w3-include-html");
			if (file) {
				/* Make an HTTP request using the attribute value as the file name */
				xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4) {
						if (this.status == 200) {elmnt.innerHTML = this.responseText;}
						if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
						/* Remove the attribute, and call this function once more */
						elmnt.removeAttribute("w3-include-html");
						includeHTML();
					}
				}			
				xhttp.open("GET", file, true);
				xhttp.send();
				/* Exit the function */
				return;
			}
		}
	};
	
	function loadTeachingCourse(pageID){
		document.getElementById('teachingOverlay').style.display = 'block';
		document.getElementById('menu_bar_div').style.display = 'none';
		document.getElementById('footer').style.display = 'none';
		document.body.style.overflow = 'hidden';
		document.getElementById('topbtn').style.visibility = 'hidden';

		document.getElementById('teachingContainer').scrollTop = 0; // Reset teachingContainer's scroll position

		teachingContainer.innerHTML = "";
		teachingContainer.innerHTML = "<button id=\"closeBtnTeachingOverlay\" onclick=\"function hideTeachingOverlay(){\
										document.getElementById('teachingOverlay').style.display = 'none';\
										document.getElementById('menu_bar_div').style.display='block';\
										document.getElementById('footer').style.display='block';\
										document.body.style.overflow = 'visible';\
										document.getElementById('topbtn').style.visibility = 'visible';\
										};hideTeachingOverlay()\"><i class=\"fas fa-times-circle\" style=\"display:contents; font-size: 20px; color: #ff0000\"></i></button>";
		teachingContainer.innerHTML += "<div w3-include-html=\""+pageID+"\"></div>";
		includeHTML();
		}

		/* Close on clicking outside teachingContainer (i.e., anywhere in teachingOverlay)  */
		/*
		document.getElementById('teachingOverlay').addEventListener('click', (event) => {
			if (!document.getElementById('teachingContainer').contains(event.target)) {
				hideTeachingOverlay();
			}
		});
		*/
		
/* loadTeachingCourse Ends */

/* Fullscreen Functionality Begins */
    /* Get into fullscreen */
    function GoInFullscreen(element) {
        if(element.requestFullscreen)
            element.requestFullscreen();
        else if(element.mozRequestFullScreen)
            element.mozRequestFullScreen();
        else if(element.webkitRequestFullscreen)
            element.webkitRequestFullscreen();
        else if(element.msRequestFullscreen)
            element.msRequestFullscreen();
    }

    /* Get out of fullscreen */
    function GoOutFullscreen() {
        if(document.exitFullscreen)
            document.exitFullscreen();
        else if(document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if(document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if(document.msExitFullscreen)
            document.msExitFullscreen();
    }

    /* Is currently in fullscreen or not */
    function IsFullScreenCurrently() {
        var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
        // If no element is in full-screen
        if(full_screen_element === null)
            return false;
        else
            return true;
    }

    function fullScreenfunction(element) {
        if(IsFullScreenCurrently()) {
            GoOutFullscreen();
        	document.getElementById("fullscreenbtn").childNodes[0].classList = "fas fa-expand";
        }
        else {
            GoInFullscreen(document.getElementById(element));
            document.getElementById("fullscreenbtn").childNodes[0].classList = "fas fa-compress";
        }
    }
/* Fullscreen Functionality Ends */

/* ResponsiveMenu Begins */
	var x = document.getElementById("menu_bar_div");
	var y = document.getElementById("menu_bar_icon");
	if (OnIndex){
	  var z = document.getElementById("menu_bar_link");
	} 

	var u = document.getElementById("dropdown_li");
	var v = document.getElementById("dropdown_caret_icon");

	var check_if_highlighted = u.getElementsByTagName( 'a' )[0].className;

	function ResponsiveMenuBar() {
	  if (x.className === "header") {
	    x.className += " responsive";
	    y.className = "fas fa-times";
	    
	    if (OnIndex){
	      z.style.backgroundColor = "#400000";
	    }

	  } else {
	    x.className = "header";
	    y.className = "fas fa-bars";
	      
	    if (OnIndex){
	      z.style.backgroundColor = "";
	    }

	  }
	  /* Also close the dropdown menu */
	  u.className = "closed";
	  v.className = "fas fa-caret-down";
	  if (check_if_highlighted !== "active"){
	    u.getElementsByTagName( 'a' )[0].className = "";
	  }
	}

	/* Close the responsive menu bar when the screen goes wider */
	function CloseResponsiveMenuBar(t) {
	  if (b.matches) { // If media query matches
	    if (x.className === "header responsive") { // Only when it was in small-screen responsive mode
	      ResponsiveMenuBar();
	    }
	  }
	}
	var b = window.matchMedia("(min-width: 600px)") /* 520px for Pubs [POS_3] */
	CloseResponsiveMenuBar(b) // Call listener function at run time
	b.addListener(CloseResponsiveMenuBar) // Attach listener function on state changes

	/* Toggle dropdown menu */
	function ToggleDropDown() {
	  if (u.className === "closed") {
	    u.className = "expanded";
	    v.className = "fas fa-caret-up";
	    u.getElementsByTagName( 'a' )[0].className = "active";
	  } else {
	    u.className = "closed";
	    v.className = "fas fa-caret-down";
	    if (check_if_highlighted !== "active"){
	      u.getElementsByTagName( 'a' )[0].className = "";
	    }
	  }
	}

	/*
	// Close on click outside
	document.onclick = function(e){
	  if (document.getElementById("menu_bar_link")){
	    if(
	    e.target.id !== "menu_bar_link" && 
	    e.target.id !== "menu_bar_icon" && 
	    e.target.id !== "dropdown_caret_icon" && 
	    e.target !== document.getElementById("dropdown_li").firstChild && 
	    e.target.className !== "headerUl"
	    )
	    {
	      if (x.className === "header responsive")
	      {
	        ResponsiveMenuBar();
	      }
	    }
	  }

	  else {
	    if(
	    e.target.id !== "dropdown_caret_icon" &&
	    e.target !== document.getElementById("dropdown_li").firstChild &&
	    e.target !== document.querySelector( ".dropdown")
	    )
	    {
	      console.log(e.target);
	      if (u.className === "expanded")
	      {
	        ResponsiveMenuBar();
	      }
	    }
	  }
	}
	*/
/* ResponsiveMenu Ends */
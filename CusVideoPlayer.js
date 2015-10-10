 "use strict";
 
 var playPauseBtn;
 var vid;
 
 window.onload = intialization;
 
 function intialization () {
	 vid = document.getElementById ("vid");
	 playPauseBtn = document.getElementById ("playPauseBtn");
	 
	 events ();
 }
 function events () {
	 playPauseBtn.addEventListener ("click", playPause);
 }
 function playPause () {
	 if (vid.paused) {
		 vid.play ();
		 playPauseBtn.innerHTML = "Pause";
	 }
	 else {
		 vid.pause ();
		 playPauseBtn.innerHTML = "Play";
	 }
 }
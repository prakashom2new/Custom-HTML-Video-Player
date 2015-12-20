 "use strict";
 
(function () {
	var vie;
	var playPauseBtn, slider, volumeBtn, muteBtn, 
		volumeSlider, muteAndSlider, fullscreenBtn, curTimeLabel, videoDurLabel;
	var vid;
	var img = new Array ();
	
	img[0] = "url(Contents/Buttons/playBtn.png)";
	img[1] = "url(Contents/Buttons/pauseBtn.png)";
	img[2] = "url(Contents/Buttons/volumeBtn.png)";
	img[3] = "url(Contents/Buttons/muteBtn.png)";
	img[4] = "url(Contents/Buttons/fullscrnBtn.png)";
	img[5] = "url(Contents/Buttons/exitFullscrnBtn.png)";

	window.onload = intialization;

	function intialization () {
		vid = document.getElementById ("vid");
		
		playPauseBtn = document.getElementById ("playPauseBtn");
		
		slider = document.getElementById ("slider");
		slider.value = 0;       // sets the slider value to 0 at the start
		
		volumeBtn = document.getElementById ("volumeBtn");
		muteBtn = document.getElementById ("muteBtn");
		volumeSlider = document.getElementById ("volumeSlider");
		muteAndSlider = document.getElementById ("muteAndSlider");
		volumeSlider.value = 1.0;		// set the intial value of volume slider to 100%
		muteAndSlider.style.visibility = "hidden";
		
		fullscreenBtn = document.getElementById ("fullscreenBtn");
		
		curTimeLabel = document.getElementById ("curTimeLabel");
		videoDurLabel = document.getElementById ("videoDurLabel");
		
		events ();
	}

	function events () {
		playPauseBtn.addEventListener ("click", playPause);
		
		slider.addEventListener ("change", playBackTime);
		vid.addEventListener ("timeupdate", updateSliderValue);
		
		volumeBtn.addEventListener ("click", volumeControl);
		muteBtn.addEventListener ("click", muteUnmute)
		volumeSlider.addEventListener ("change", function () { vid.volume = volumeSlider.value; });
		
		fullscreenBtn.addEventListener ("click", fullscrn);
		
	}

	function playPause () {
		if (vid.paused) {
			vid.play ();
			playPauseBtn.style.backgroundImage = img[1];
		}
		else {
			vid.pause ();
			playPauseBtn.style.backgroundImage = img[0];
		}
	}
	
	function playBackTime () {            // change the video when user moves the slider
		var seek = vid.duration * (slider.value / 100);
		vid.currentTime = seek;
	}
	function updateSliderValue () {
		slider.value = (vid.currentTime / vid.duration) * 100; // to update slider value
		
		var curMinutes = Math.floor (vid.currentTime / 60);
		var curSeconds = Math.floor (vid.currentTime - curMinutes * 60);
		
		var durMinutes = Math.floor (vid.duration / 60);
		var durSeconds = Math.floor (vid.duration - durMinutes * 60);
		
		curTimeLabel.innerHTML = curMinutes + ":" + curSeconds;
		
		videoDurLabel.innerHTML = durMinutes + ":" + durSeconds;		// set value of video's duration to vidDurLabel
	}
	
	function volumeControl () {
		if (muteAndSlider.style.visibility === "hidden") {
			muteAndSlider.style.visibility = "visible";
		}
		else {
			muteAndSlider.style.visibility = "hidden";
		}
	}
	function muteUnmute () {
		if (vid.muted){
			vid.muted = false;
			muteBtn.style.backgroundImage = img[3];
		}
		else {
			vid.muted = true;
			muteBtn.style.backgroundImage = img[2];
		}
	}
	
	function fullscrn () {
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement && !document.webkitFullscreenElement){
			//console.log ("fullscreen");
			if (vid.parentNode.requestFullscreen) {
				vid.parentNode.requestFullscreen ();
			}
			else if (vid.parentNode.mozRequestFullScreen) {
				vid.parentNode.mozRequestFullScreen ();
			}
			else if (vid.parentNode.msRequestFullscreen) {
				vid.parentNode.msRequestFullscreen ();
			}
			else if (vid.parentNode.webkitRequestFullscreen) {
				vid.parentNode.webkitRequestFullscreen ();
			}
			
			fullscreenBtn.style.backgroundImage = img[5];
		}
		else {
			//console.log ("exit fullscreen");
			if (document.exitFullscreen) {
				document.exitFullscreen ();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen ();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen ();
			}
			else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen ();
			}
			
			fullscreenBtn.style.backgroundImage = img[4];
		}
	}
	
} ());
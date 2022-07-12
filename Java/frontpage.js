/** $id obEvents.js 0001 6/9/2007 18:06 $ck
* Observe single Event
* A behaviour like vanilla
* 
* @author   chaoskaizer <avik.st.clair+animepaper@gmail.com>
* @link     https://launchpad.net/~chaoskaizer
* @todo     addAseventListener, Uncached.EventListener 
*
*/


var obElement = Class.create();

/**
 * @param string|mixed  strname  element ID or CSS selector
 *
 */
obElement.prototype = {
    initialize: function(strname){
        this.strname = strname;        
    }, 
    setToggleFx: function(){
        var el = $$(this.strname);
        
        // alert(el.length);   
        if (!el) return;
             
        el.each(function(link){
            var str = link.getAttribute('rel');

            if (!str) return;
            var container = $(str);
            
                if (!container){
                    // if there is no targeted element disabled the toggle link                
                    link.setAttribute('title','Error: ' 
                                     + 'Element #' + str + ' is Not Exist!');
                    link.setStyle({color:'gray'}); 
                    link.addClassName('error-notice');
                    link.setAttribute('disabled','disabled');
                    return;     
                }
            
                link.setAttribute('title','Toggle Contents');
                // link.addClassName('toggle-open');
                
                link.onclick = function(){
                    Effect.toggle(container,'slide'); // scriptaculous toggle.fx - effect.js
                    return false;   
                }              
        }); 
    }    
}

Event.observe(window, 'load', function(){
    
 var submenuLink = new obElement('a.toggle');
 submenuLink.setToggleFx(); 
     
});

// Create namespace
if (at == undefined) var at = {};
if (at.bartelme == undefined) at.bartelme = {};

// ticker Class
at.bartelme.ticker = Class.create();
at.bartelme.ticker.prototype = {
	initialize: function()
	{
		// Get elements
		this.interval = 7000;
		this.container = $("ticker");
		this.messages  = $A(this.container.getElementsByTagName("li"));
		this.number_of_messages = this.messages.length;
		if (this.number_of_messages == 0)
		{
			this.showError();
			return false;
		}
		this.current_message = 0;
		this.previous_message = null;
		// Create toggle button
		this.toggle_button = document.createElement("a");
		this.toggle_button.href = "#";
		this.toggle_button.id = "toggleticker";
		this.toggle_button.innerHTML = "";
		Event.observe(this.toggle_button, "click", this.toggle.bindAsEventListener(this), false);
		this.container.appendChild(this.toggle_button);
		this.hideMessages();
		this.showMessage();
		// Install timer
		this.timer = setInterval(this.showMessage.bind(this), this.interval);
  	},
	showMessage: function()
	{
		Effect.Appear(this.messages[this.current_message]);
		setTimeout(this.fadeMessage.bind(this), this.interval-2000);
		if (this.current_message < this.number_of_messages-1)
		{
			this.previous_message = this.current_message;
			this.current_message = this.current_message + 1;
		} else {
			this.current_message = 0;
			this.previous_message = this.number_of_messages - 1;
		}
	},
	fadeMessage: function()
	{
		Effect.Fade(this.messages[this.previous_message]);
	},
	hideMessages: function()
	{
		this.messages.each(function(message)
		{
			//Element.hide(message);
		})
	},
	toggle: function()
	{
		Effect.SlideUp(this.container, 1000);
	},
	showError: function()
	{
		if (this.container.getElementsByTagName("ul").length == 0)
		{
			this.list = document.createElement("ul");
			this.container.appendChild(this.list);
		} else {
			this.list = this.container.getElementsByTagName("ul")[0];
		}
		this.errorMessage = document.createElement("li");
		this.errorMessage.className = "error";
		this.errorMessage.innerHTML = "Could not retrieve data";
		this.list.appendChild(this.errorMessage);
	}
}

Event.observe(window, "load", function(){new at.bartelme.ticker()}, false);

//showcase

var speed_delay = 8000;
var slide_speed = 1000;
var autoslide = true;
var slideOuter = "slide-wrapper";
var slideLoading = "slide-loading";
var slideClass = "slide";
var naviClass = "navi";
var activeSuffix = "-active";
var isShowing = 0;
var slides;
var navis;
var fx1 = new Array();
var firstDelay = false;
var pauseFlag = false;
var timer;
var playButton;

function initFrontpageSlideshow() {
	displayloading = document.getElementById(slideLoading);
	if (displayloading) displayloading.style.display = "none";
	else return;
	displayslide = document.getElementById(slideOuter);
	if (displayslide) displayslide.style.display = "block";
	
	if (readCookie("com_jw_fpss") == "true") autoslide = true;
	else if (readCookie("com_jw_fpss") == "false") autoslide = false;	
	playButton = document.getElementById('playButton');
	if (autoslide) { showPauseButton(); }
	else { showPlayButton(); }

	slides = document.getElementsByClassName(slideClass);
	navis = document.getElementsByClassName(naviClass);
	
	if (slides.length == 0 || navis.length == 0) return;
	
	for (i = 0; i < slides.length; ++i) {
		fx1[i] = new fx.Combo(slides[i], { opacity: true, width: false, duration: slide_speed, height: false, toggle: false });
		navis[i].onclick = function() {
			current = null;
			for (j = 0; j < navis.length; ++j) {
				if (this == navis[j]) current = j;
			}
			if (current != isShowing) {
				fx1[isShowing].clearTimer();
				if (fx1[isShowing].el.offsetHeight) fx1[isShowing].hide();
				fx1[current].toggle();
				navis[isShowing].className = naviClass;
				navis[current].className = naviClass + activeSuffix;
				isShowing = current;
				clearSlide();
			}
			
			return false;
		}
		if (i != 0) {
			fx1[i].hide();
		} else {
			navis[i].className = naviClass + activeSuffix;
		}
	}
}

function showPauseButton() {
	createCookie("com_jw_fpss", "true");
	playButton.innerHTML = "Pause"; // change "Pause" label here
	playButton.title = "Pause"; // change "Pause" label here
	pauseFlag = false;
	autoSlide();
}

function showPlayButton() {
	createCookie("com_jw_fpss", "false");
	playButton.innerHTML = "Play"; // change "Play" label here
	playButton.title = "Play"; // change "Play" label here
	pauseFlag = true;
	clearTimeout(timer);
	firstDelay = false;
}

function showNext() {
	if (slides.length <= 1) return;
	fx1[isShowing].clearTimer();
	if (fx1[isShowing].el.offsetHeight) fx1[isShowing].hide();
	navis[isShowing].className = naviClass;
	if (isShowing == slides.length - 1) {
		fx1[0].toggle();
		isShowing = 0;
	} else {
		fx1[++isShowing].toggle();
	}
	navis[isShowing].className = naviClass + activeSuffix;
}

function showPrev() {
	if (slides.length <= 1) return;
	fx1[isShowing].clearTimer();
	if (fx1[isShowing].el.offsetHeight) fx1[isShowing].hide();
	navis[isShowing].className = naviClass;
	if (isShowing == 0) {
		fx1[slides.length - 1].toggle();
		isShowing = slides.length - 1;
	} else {
		fx1[--isShowing].toggle();
	}
	navis[isShowing].className = naviClass + activeSuffix;
}

function autoSlide() {
	if (!pauseFlag) {
		timer = setTimeout('autoSlide()', speed_delay);
		if (!firstDelay) firstDelay = true;
		else showNext();
	}
}

function clearSlide() {
	if (!pauseFlag) {
		clearTimeout(timer);
		firstDelay = false;
		autoSlide();
	}
}

function stopme() {
	pauseFlag = true;
}

function playButtonClicked() {
	if (pauseFlag) showPauseButton();
	else showPlayButton();
}

// Cookie handle
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Load everything up
function fpssinit() {
    if (arguments.callee.done) return;
    arguments.callee.done = true;
    if (_timer) clearInterval(_timer);
	initFrontpageSlideshow();
};
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fpssinit, false);
}
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload_fpss defer src=javascript:void(0)><\/script>");
    var scriptFPSS = document.getElementById("__ie_onload_fpss");
    scriptFPSS.onreadystatechange = function() {
        if (this.readyState == "complete") {
            fpssinit();
        }
    };
/*@end @*/
if (/WebKit/i.test(navigator.userAgent)) {
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            fpssinit();
        }
    }, 10);
}
window.onload = fpssinit;

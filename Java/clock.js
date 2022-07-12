<!--
function DisplayTime () {
dateObj = new Date();
// get hours
var hour = dateObj.getHours();
// get minutes
var minutes = dateObj.getMinutes();
// get seconds
var seconds = dateObj.getSeconds();
// is hour less then 10?
if (hour < 10) {
// add 0 in front so the hour become, for example, 01 instead of 1
// we do this to always display two digits for the hour
hour = "0" + hour;
}
// is minutes less then 10?
if (minutes < 10) {
// add 0 in front so the minutes become, for example, 01 instead of 1
// we do this to always display two digits for the minutes
minutes = "0" + minutes;
}
// is seconds less then 10?
if (seconds < 10) {
// add 0 in front so the seconds become, for example, 01 instead of 1
// we do this to always display two digits for the seconds
seconds = "0" + seconds;
}
// now add our hour, minutes, and seconds to the input box
document.clock.time.value = hour + ":" + minutes + ":" + seconds;
// we continuously call the DisplayTime () funtion after 1000 milliseconds
// or after 1 second. Basically, this will change the time in our clock.
// For example, you would observe the seconds being changed every second.
// In other words, this script will continue to execute every one second!
setTimeout("DisplayTime()", 1000);
}
//-->
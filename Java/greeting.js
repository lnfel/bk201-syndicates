function GetHourBasedGreeting () {
var dateObj = new Date ();
var currHour = dateObj.getHours (); // gets current hour: 0 - 23
var greeting;
// is hour less than 12?
if (currHour < 12) {
greeting = "Good morning!";
}
// Or is hour between 12 and 17?
else if (currHour > 11 && currHour < 17) {
greeting = "Good afternoon!";
}
// Or is hour between 17 and 20?
else if (currHour > 16 && currHour < 20) {
greeting = "Good evening!";
}
// Or is hour between 20 and 23?
else if (currHour > 19 && currHour <= 23) {
greeting = "Good night!";
}
return greeting;
}
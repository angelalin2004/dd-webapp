/* from the earliest Sunday prior to the day instruction begins to the last day of finals for each quarter */
var fall = 7 * 12 - 1,
  fall_const = fall;
var winter = 7 * 11 - 1;
winter_const = winter;
var spring = 7 * 11 - 1;
var totaldays = fall + winter + spring;
/* defaults to apartment dining plan */
var totalbal = 2450;
var fallbal = 851;
var wispbal = 799;

var firstDay = new Date("September, 20, 2015");
var lastDay = new Date("December, 11, 2015");

var Today = new Date();
if (Today < firstDay) {
  Today = new Date(firstDay);
}
var days = DayDiff(Today),
  days_const = days;

/* by default, display the amount of dining dollars you'd have if you're on track*/
var ontrack = onTrack();
document.getElementById("balance").value = ontrack;

var bal, rate, perday, canshould, text;
var wknds_all = 0,
  wknds_left = 0;
var holidays_all = 0;
holidays_left = 0;

function myFunction() {
  bal = document.getElementById("balance").value;
  // removes commas
  bal = bal.replace(/\,/g, '');
  // check if input is a valid number
  if (isNaN(bal) == true) {
    document.getElementById("budget").innerHTML = "Please enter a valid number.";
    return;
  }

  if (document.getElementById("diningplan").value == "apartment") {
    totalbal = 2450;
    fallbal = 851;
    wispbal = 799;
  } else if (document.getElementById("diningplan").value == "reshall") {
    totalbal = 3160;
    fallbal = 1097;
    wispbal = 1031;
  } else if (document.getElementById("diningplan").value == "buyup") {
    totalbal = 3800;
    fallbal = 1320;
    wispbal = 1239;
  } else if (document.getElementById("diningplan").value == "select") {
    totalbal = 3800;
    fallbal = 1320;
    wispbal = 1239;
  }

  reset();
  console.log(document.getElementById("no-wknds").checked);
  if (document.getElementById("no-wknds").checked == true) {
    wknds_all = 0;
    wknds_left = 0;
    weekends(new Date(firstDay), new Date(lastDay));
    console.log(wknds_all);
    console.log(wknds_left);
    fall -= wknds_all;
    days -= wknds_left;
  }
  if (document.getElementById("no-holidays").checked == true) {

    holidays_all = 0;
    holidays_left = 0;

    holidays(new Date(firstDay), new Date(lastDay));
    fall -= holidays_all;
    days -= holidays_left;
  }

  if (document.getElementById("hdh").checked == true) {
    ontrack = onTrack();
    perday = Math.round((bal - wispbal - wispbal) / days * 100) / 100;
  } else {
    /* how many dining dollars you'd spend per day if you were on track */
    perday = totalbal / totaldays;
    /* how much $$ you'd have now if you were on track*/
    ontrack = perday * (days + winter + spring);
    ontrack = Math.round(ontrack * 100) / 100;
    /* how much you should spend every day for the rest of the year */
    perday = Math.round(bal / (days + winter + spring) * 100) / 100;
  }

  rate = Math.round((totalbal - bal) / (totalbal - ontrack) * 10000) / 100;
  var diff = Math.round((bal - ontrack) * 100) / 100;

  /* depending on the rate, we change the tone */
  if (rate < 100)
    canshould = "can";
  else
    canshould = "should";

  text = "There are <u>" + days + "</u> days left in the Fall 2015 Quarter.<br>You should have $" + ontrack + " left.<br>If you have $" + bal + " dining dollars left,<br>Your spending rate is <u>" + rate + "</u>%";
  if (diff > 0)
    text += "<br>Since you have a surplus of $<u>" + diff + "</u>,";
  else if (diff < 0) {
    diff = diff * (-1);
    text += "<br>Since you have a debt of -$<u>" + diff + "</u>,";
  }
  text += "<br>You " + canshould + " spend $<u>" + perday + "</u> each day<br>to be on track for next quarter.";
  document.getElementById("budget").innerHTML = text;
}

function onTrack() {
  var ontrack = fallbal / fall * (days);
  ontrack = Math.round(ontrack * 100) / 100. + wispbal + wispbal;
  // resolves adding issue
  ontrack = Math.round(ontrack * 1e12) / 1e12;
  return ontrack;
}

function reset() {
  fall = fall_const;
  winter = winter_const;
  days = days_const;
}

function DayDiff(CurrentDate) {
  var DayCount = (lastDay - CurrentDate) / (1000 * 60 * 60 * 24);
  DayCount = Math.ceil(DayCount);
  return (DayCount);
}

/* calculates the number of weekend days in the quarter and the number of weekend days left */
function weekends(a, b) {
  if (a > b)
    return;
  if (a.getDay() == 0 || a.getDay() == 6) {
    wknds_all++;
    if (a > Today)
      wknds_left++;
  }
  a.setDate(a.getDate() + 1);
  weekends(a, b);
}

/* calculates the number of holiday days in the quarter and the number of holiday days left */
function holidays(a, b) {
  if (a > b)
    return;
  if ((a.getMonth() == 5 && a.getDate() == 25)) {
    holidays_all++;
    if (a > Today)
      holidays_left++;
  }
  a.setDate(a.getDate() + 1);
  holidays(a, b);
}

function whatsThis() {
  /* on clicking "what's this", show explanation and change text to "collapse" */
  if (document.getElementById("explanation").style.display == "none") {
    document.getElementById("explanation").style.display = "inline";
    document.getElementById("whats_this").innerHTML = "(Collapse)";
  } else {
    document.getElementById("explanation").style.display = "none";
    document.getElementById("whats_this").innerHTML = "(What's this?)";
  }
}

$(document).ready(function() {
  $("#whats_this").click(function() {
    $("#explanation").slideToggle(1000);
    if ($("#whats_this").text() == "(What's this?)")
      $("#whats_this").text("(Collapse)");
    else
      $("#whats_this").text("(What's this?)");
  });
});
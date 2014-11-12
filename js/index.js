/* from the earliest Sunday prior to the day instruction begins to the last day of finals for each quarter */
var fall = 7*12-1;
var winter = 7*11-1;
var spring = 7*11-1;
var totaldays = fall + winter + spring;
/* defaults to apartment dining plan */
var totalbal = 2450;
var fallbal = 851;
var wispbal = 799;


var Today = new Date();
var days = DayDiff(Today);

/* by default, display the amount of dining dollars you'd have if you're on track*/
var ontrack = fallbal/fall*(days);
ontrack = Math.round(ontrack*100)/100 + wispbal + wispbal;
document.getElementById("balance").value = ontrack;

var bal, rate, perday, canshould, text;

function myFunction() {
  bal = document.getElementById("balance").value;
  if ( document.getElementById("diningplan").value == "apartment") {
    totalbal = 2450;
    fallbal = 851;
    wispbal = 799;
  }
  else if ( document.getElementById("diningplan").value == "reshall") {
    totalbal = 3160;
    fallbal = 1097;
    wispbal = 1031;
  }
  else if ( document.getElementById("diningplan").value == "buyup") {
    totalbal = 3800;
    fallbal = 1320;
    wispbal = 1239;
  }
  
  /* FORCE-CODING for now */
  /* STILL DOESN'T WORK */
  /*
  if ( document.getElementById("wknd").value == "wknd") {
    
    fall -= 22;
    days -= 10;
  }
  else {
    fall = 7*12-1;
  }
  */
  
  ontrack = fallbal/fall*(days);
  ontrack = Math.round(ontrack*100)/100 + wispbal + wispbal;
    
  rate = Math.round(ontrack/bal*10000)/100;
  perday = Math.round((bal-wispbal-wispbal)/days*100)/100;
  
 
  // document.getElementById("test").innerHTML = ontrack+ " " + rate;
  
  /* depending on the rate, we change the tone */
  if ( rate < 100)
    canshould = "can";
  else
    canshould = "should";
  
  text = "There are <u>" + days + "</u> days left in the Fall 2014 Quarter.<br>If you have $" + bal + " dining dollars left,<br>Your spending rate is <u>" + rate + "</u>%<br>You "+ canshould +" spend $<u>" + perday + "</u> each day<br>to be on track for next quarter.";
  document.getElementById("budget").innerHTML = text;
}

function DayDiff(CurrentDate)
{
  var TYear=CurrentDate.getFullYear();
  var TDay=new Date("December, 19, 2014");
  TDay.getFullYear(TYear);
  var DayCount=(TDay-CurrentDate)/(1000*60*60*24);
  DayCount=Math.ceil(DayCount); 
  return(DayCount);
}
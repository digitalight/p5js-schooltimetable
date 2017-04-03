var lessonData;
var bell;
var lessonsToday = [];
var lessonStart;
var lessonEnd;
var isLesson = false;
var percentage;
var mute = true;
var mutebutton;
function preload() {
    lessonData = loadJSON("data/lessons.json");
    bell = loadSound("sounds/bell.mp3");
}

function setup() {
    noCanvas(); // Needed to stop canvas being made
    getTodayLessons();
    checkLesson();
    setInterval(checkLesson, 1000);
    timeIt();
    setInterval(timeIt, 1000);
    
    // Create mute icon
    var mutebutton = createImg("sounds/mute.png", "Mute");
    mutebutton.position((innerWidth/2-30),20);
    mutebutton.show();
    mutebutton.mousePressed(toggleSound);  // Mouse press event triggers toggleSound function

    // Toggle Bell on or off
    function toggleSound(){
      if (mute == true){
        console.log("Hello");
        mute = false;
        mutebutton.attribute("src","sounds/loud.png");
        mutebutton.attribute("alt","Loud");
      } else if (mute == false) {
        mute = true;
        mutebutton.attribute("src","sounds/mute.png");
        mutebutton.attribute("alt","Mute");
      }
    }

    // Go through JSON and get todays lessons objects and put in lessonToday array
    function getTodayLessons() {
        var lessons = lessonData.lesson; // Lesson objects in JSON
        var today = dayofweek(); // Get name of today
        for (var i = 0; i < lessons.length; i++) { // Loop through every lesson object
            var days = lessons[i].days;
            for (var j = 0; j < days.length; j++) { // Loop through each Day array that is in the lesson object
                if (days[j] == today) { // Filter just today in Day array
                    lessonsToday.push(lessons[i]); // Add lesson object into a new Array that contains just Todays lessons.
                }
            }
        }
    }

    // Go through lessonsToday array, get current time and then check if its between any lesson start and end time.
    function checkLesson() {
        var d = new Date();
        var n = d.getTime();
        currentLesson = select("#currentLesson");
        currentLesson.html("No Lesson"); // Default is there is no lesson. Then if condition
        for (var i = 0; i < lessonsToday.length; i++) {
            if ((n > calcTime(lessonsToday[i].start)) && (n < calcTime(lessonsToday[i].end))) {
              currentLesson.html(lessonsToday[i].name);
              lessonStart = lessonsToday[i].start;
              lessonEnd = lessonsToday[i].end;
              isLesson = true;
              //  console.log(lessonsToday[i].name);
            } else {
              isLesson = false;
            }
            if ((n < calcTime(lessonsToday[i].end)) && (n > calcTime(lessonsToday[i].end)-1000) && (!mute)){
              bell.play();
              console.log("Ring");
            }
        }

    }

    function timeIt() {
        var curtime = select('#currentTime');
        var curday = select('#currentDay');
        var timearray = [];
        var h = nf(hour(), 2);
        var m = nf(minute(), 2);
        var s = nf(second(), 2);
        d = dayofweek();
        curtime.html(h + ":" + m + ":" + s);
        curday.html(d);

          if (isLesson == true) {
            select("#remaining").html(timeRemaining(lessonEnd,lessonStart)[0]);
            select("#remain-progress").style("width", timeRemaining(lessonEnd,lessonStart)[1] + "%")
          } else {
            select("#remaining").html("");
          }
    }

    function calcTime(time) {
        var mon = month();
        var today = day();
        var thisyear = year();
        var timearray = [mon, today, thisyear, time];
        var time1 = join(timearray, " ");
        var time2 = new Date(time1);
        var time3 = time2.getTime();
        return time3;
    }
    // Convert String Time in JSON to Unix time format
    function unixTime(strTime) {
      var mon = month();
      var today = day();
      var thisyear = year();
      var timearray = [mon, today, thisyear, strTime];
      var time = new Date(join(timearray, " ")).getTime();
      return time;
    }

    function timeRemaining(endTime,startTime) {
        var start = unixTime(startTime);
        var end = unixTime(endTime);
        var current = new Date().getTime();
        var diff = new Date(end - current);
        var prog = new Date(current - start).getTime();
        var percentage = floor(prog / (prog + diff.getTime()) * 100);
        var diffhours = diff.getHours();
        var diffmin = diff.getMinutes();
        var diffsec = diff.getSeconds();
        var remain = diffhours + ":" + nf(diffmin, 2) + ":" + nf(diffsec, 2);
        return [remain, percentage];
    }

    // Function to get current day of the week.
    function dayofweek() {
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var n = weekday[d.getDay()];
        return n;
    }
}

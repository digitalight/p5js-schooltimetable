function setup() {
    noCanvas();
    timeIt();
    setInterval(timeIt, 1000);

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
        currentLesson();
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

    function timeRemaining(time) {
        var mon = month();
        var today = day();
        var thisyear = year();
        var timearray = [mon, today, thisyear, time];
        var time1 = join(timearray, " ");
        var time2 = new Date(time1);
        var diff = new Date(time2.getTime() - (new Date()));
        var diffhours = diff.getHours();
        var diffmin = diff.getMinutes();
        var diffsec = diff.getSeconds();
        var remain = diffhours + ":" + nf(diffmin, 2) + ":" + nf(diffsec, 2);
        return remain;
    }

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

    function currentLesson() {
        var d = new Date();
        var n = d.getTime();
        var l01 = select('#l01');
        var l02 = select('#l02');
        var lb = select('#lb');
        var l03 = select('#l03');
        var l04 = select('#l04');
        var lass = select('#lass');
        var lun = select('#lun');
        var lreg = select('#lreg');
        var l05 = select('#l05');
        var l06 = select('#l06');

        if ((n > calcTime("08:55")) && (n < calcTime("09:45"))) {
          l01.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("09:45")) && (n < calcTime("10:35"))) {
          l01.class('list-group-item');
          l02.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("10:35")) && (n < calcTime("10:55"))) {
          l02.class('list-group-item');
          lb.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("10:55")) && (n < calcTime("11:45"))) {
          lb.class('list-group-item');
          l03.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("11:45")) && (n < calcTime("12:35"))) {
          l03.class('list-group-item');
          l04.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("12:35")) && (n < calcTime("12:55"))) {
          l04.class('list-group-item');
          lass.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("12:55")) && (n < calcTime("13:40"))) {
          lass.class('list-group-item');
          lun.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("13:40")) && (n < calcTime("13:50"))) {
          lun.class('list-group-item');
          lreg.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("13:50")) && (n < calcTime("14:35"))) {
          lreg.class('list-group-item');
          l05.class('list-group-item list-group-item-success');
        } else if ((n > calcTime("14:35")) && (n < calcTime("15:30"))) {
          l05.class('list-group-item');
          l06.class('list-group-item list-group-item-success');
        } else {
            return 0;
        }
    }
}

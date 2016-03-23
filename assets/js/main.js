var isRunning = false;
var btnStart = document.getElementById("btnStart");
var btnReset = document.getElementById("btnReset");
var intervalId;

document.querySelector('#time').textContent = "00:00";

function startTimer(duration, display) {
  var timer = duration, hours, minutes, seconds;
  var bar = 0;

  intervalId = setInterval(function() {
    timer = Number(timer);
    hours   = Math.floor(timer / 3600);
    minutes = Math.floor(timer % 3600 / 60);
    seconds = Math.floor(timer % 3600 % 60);

    var hms = ((hours > 0 ? hours + ":" + (minutes < 10 ? "0" : "") : "") + minutes + ":" + (seconds< 10 ? "0" : "") + seconds);

    display.textContent = hms;
    document.title = "my time | " + hms;

    if (--timer < 0) {
        stopTimer();
        notifyMe();
        document.getElementById('alarm').play();
    }

    if(!isRunning){
      stopTimer();
    }

    progress(bar++, duration);

  }, 1000);
}

function stopTimer(){
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  document.querySelector('#time').textContent = "00:00";
}




btnStart.onclick = function() {
  if (!isRunning) {
    isRunning = true;
    var time = 0;
    var m = 60 * document.getElementById('inputMinute').value;
    var h = 3600 * document.getElementById('inputHours').value;
    var display = document.querySelector('#time');

    var regex = /[0-9]|\./;
    if(regex.test(m)) {
      time = m;
      if(regex.test(h)) {
        time = time+h;
      }
      startTimer(time, display);
    }
  }
};

btnReset.onclick = function(){
  isRunning = false;
};

function notifyMe() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {
    var notification = new Notification("The time finished!");
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("The time finished!");
      }
    });
  }
}

Notification.requestPermission();

function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
}


 function progress(b, t){
    var p = (b/t)*100;
    document.getElementById("progress").style.width = p+"%";
 }

 function validate(event) {
    var key = window.event ? event.keyCode : event.which;

    if (event.keyCode === 8 || event.keyCode === 46
     || event.keyCode === 37 || event.keyCode === 39) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
};

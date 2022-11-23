//count current time
let totalSeconds = 0;
let seconds = 0;
let minutes = 0;
let myInterval;

//count pause time
let totalSeconds2 = 0;
let seconds2 = 0;
let minutes2 = 0;
let myInterval2;

let buttonPressed = "";

//keeping track of data points
//tracking current time and pause time
let pomodoro = [];
let pomodoroPause = [];
let shortBreak = [];
let shortBreakPause = [];
let longBreak = [];
let longBreakPause = [];
//new tracking: Time Stamp
let oldDate;
let CurrentDate;

let pomodoroDate = [];
let shortBreakDate = [];
let longBreakDate = [];
//new tracking: Notes <= Tackling this one
let pomodoroNotes = [];
let shortBreakNotes = [];
let longBreakNotes = [];
//new tracking: additional data/following score
let pomodoroScore = [];
let shortBreakScore = [];
let longBreakScore = [];

//total accumulation of seconds for displaying results
let totalSecondsPomodoro = 0;
let totalSeconds2PomodoroPause = 0;
let totalSecondsBreak = 0;
let totalSeconds2BreakPause = 0;
let totalSecondsLongBreak = 0;
let totalSeconds2LongBreakPause = 0;

let alarmSound = new Audio("Kiznaiver.mp3");
let alarmTime;
let alarmSoundisPlaying = false;
let pauseSound = new Audio("Chobits Opening.mp3");

// Update the count down every 1 second
function calculation() {
  totalSeconds = totalSeconds + 1;
  seconds = totalSeconds % 60;
  minutes = Math.floor(totalSeconds / 60);
  hours = Math.floor(totalSeconds / 3600);

  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML =
    (hours > 9 ? hours : "0" + hours) +
    ":" +
    (minutes > 9 ? minutes : "0" + minutes) +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  if (Math.ceil(Number(alarmTime)) == Number(totalSeconds)) {
    alarmSound.play();
    alarmSoundisPlaying = true;
  }
}

function calculation2() {
  totalSeconds2 = totalSeconds2 + 1;
  seconds2 = totalSeconds2 % 60;
  minutes2 = Math.floor(totalSeconds2 / 60);
  hours = Math.floor(totalSeconds2 / 3600);

  // Output the result in an element with id="demo"
  document.getElementById("demo2").innerHTML =
    (hours > 9 ? hours : "0" + hours) +
    ":" +
    (minutes2 > 9 ? minutes2 : "0" + minutes2) +
    ":" +
    (seconds2 > 9 ? seconds2 : "0" + seconds2);
}

function recordNote(dynamicStringIndex) {
  console.log("dynamicStringIndex: " + dynamicStringIndex);
  var box = document.getElementById(dynamicStringIndex);
  var textBox = document.createElement("input");
  var textBoxAtr = document.createAttribute("id");
  var textBoxAtr2 = document.createAttribute("type");
  textBoxAtr.value = "textBox";
  textBoxAtr2.value = "text";
  console.log(box);
  box.appendChild(textBox);
}

function displayResult() {
  document.getElementById("column1Header").innerHTML = "Pomodoro:";
  document.getElementById("column2Header").innerHTML = "Short Break:";
  document.getElementById("column3Header").innerHTML = "Long Break:";
  document.getElementById("column1Content").innerHTML = "";
  document.getElementById("column2Content").innerHTML = "";
  document.getElementById("column3Content").innerHTML = "";

  for (i = 0; i < pomodoro.length; i++) {
    var box = document.createElement("div");
    var boxAtr = document.createAttribute("id");
    boxAtr.value = "custom1Div" + i;
    box.setAttributeNode(boxAtr);
    var parentBox = document.querySelector("#column1Content");

    box.style.display = "flex";
    box.style.border_left = "1px solid black";
    box.style.border_right = "1px solid black";
    box.style.border_bottom = "1px solid black";
    box.style.height = "16px";

    var smallerBox = document.createElement("div");
    var smallerBoxAtr = document.createAttribute("id");
    smallerBoxAtr.value = "customDivDate";
    smallerBox.setAttributeNode(smallerBoxAtr);

    var smallerBox2 = document.createElement("div");
    var smallerBox2Atr = document.createAttribute("id");
    smallerBox2Atr.value = "customDivTime";
    smallerBox2.setAttributeNode(smallerBox2Atr);

    smallerBox.textContent = pomodoroDate[i];
    smallerBox2.textContent = pomodoro[i] + pomodoroPause[i];

    parentBox.appendChild(box);
    box.appendChild(smallerBox);
    box.appendChild(smallerBox2);
    if (pomodoro[i] != "") {
      var noteButton = document.createElement("button");
      var noteButtonAtr = document.createAttribute("id");
      var noteButtonAtr2 = document.createAttribute("onclick");
      noteButtonAtr2.value = "recordNote('custom1Div" + i + "')";
      noteButton.setAttributeNode(noteButtonAtr2);
      noteButton.textContent = "+";
      noteButtonAtr.value = "noteButton";
      noteButton.setAttributeNode(noteButtonAtr);
      box.appendChild(noteButton);
    }
  }
  for (i = 0; i < shortBreak.length; i++) {
    var box = document.createElement("div");
    var boxAtr = document.createAttribute("id");
    boxAtr.value = "custom2Div" + i;
    box.setAttributeNode(boxAtr);
    var parentBox = document.querySelector("#column2Content");

    box.style.display = "flex";
    box.style.border_left = "1px solid black";
    box.style.border_right = "1px solid black";
    box.style.border_bottom = "1px solid black";
    box.style.height = "16px";

    var smallerBox = document.createElement("div");
    var smallerBoxAtr = document.createAttribute("id");
    smallerBoxAtr.value = "customDivDate";
    smallerBox.setAttributeNode(smallerBoxAtr);

    var smallerBox2 = document.createElement("div");
    var smallerBox2Atr = document.createAttribute("id");
    smallerBox2Atr.value = "customDivTime";
    smallerBox2.setAttributeNode(smallerBox2Atr);

    smallerBox.textContent = shortBreakDate[i];
    smallerBox2.textContent = shortBreak[i] + shortBreakPause[i];

    parentBox.appendChild(box);

    box.appendChild(smallerBox);
    box.appendChild(smallerBox2);
    if (shortBreak[i] != "") {
      var noteButton = document.createElement("button");
      var noteButtonAtr = document.createAttribute("id");
      var noteButtonAtr2 = document.createAttribute("onclick");
      noteButtonAtr2.value = "recordNote('custom2Div" + i + "')";
      noteButton.setAttributeNode(noteButtonAtr2);
      noteButton.textContent = "+";
      noteButtonAtr.value = "noteButton";
      noteButton.setAttributeNode(noteButtonAtr);
      box.appendChild(noteButton);
    }
  }
  for (i = 0; i < longBreak.length; i++) {
    var box = document.createElement("div");
    var boxAtr = document.createAttribute("id");
    boxAtr.value = "custom3Div" + i;
    box.setAttributeNode(boxAtr);
    var parentBox = document.querySelector("#column3Content");

    box.style.display = "flex";
    box.style.border_left = "1px solid black";
    box.style.border_right = "1px solid black";
    box.style.border_bottom = "1px solid black";
    box.style.height = "16px";

    var smallerBox = document.createElement("div");
    var smallerBoxAtr = document.createAttribute("id");
    smallerBoxAtr.value = "customDivDate";
    smallerBox.setAttributeNode(smallerBoxAtr);

    var smallerBox2 = document.createElement("div");
    var smallerBox2Atr = document.createAttribute("id");
    smallerBox2Atr.value = "customDivTime";
    smallerBox2.setAttributeNode(smallerBox2Atr);

    smallerBox.textContent = longBreakDate[i];
    smallerBox2.textContent = longBreak[i] + longBreakPause[i];

    parentBox.appendChild(box);
    box.appendChild(smallerBox);
    box.appendChild(smallerBox2);
    if (longBreak[i] != "") {
      var noteButton = document.createElement("button");
      var noteButtonAtr = document.createAttribute("id");
      var noteButtonAtr2 = document.createAttribute("onclick");
      noteButtonAtr2.value = "recordNote('custom3Div" + i + "')";
      noteButton.setAttributeNode(noteButtonAtr2);
      noteButton.textContent = "+";
      noteButtonAtr.value = "noteButton";
      noteButton.setAttributeNode(noteButtonAtr);
      box.appendChild(noteButton);
    }
  }
}

let firstButtonOfTheDay = false;

function startPomodoro() {
  if (firstButtonOfTheDay == false) {
    currentDate = new Date();
    firstButtonOfTheDay = true;
  }
  pauseSound = new Audio("Chobits Opening.mp3");
  alarmSound.pause();
  alarmSound = new Audio("Kiznaiver.mp3");
  alarmTime = document.getElementById("pomodoro-time").value * 60;

  hours = Math.floor(totalSeconds / 3600);
  hours2 = Math.floor(totalSeconds2 / 3600);

  if (buttonPressed == "break") {
    totalSecondsBreak += totalSeconds;
    totalSeconds2BreakPause += totalSeconds2;

    pomodoro.push("");
    pomodoroPause.push("");
    pomodoroDate.push("");
    pomodoroNotes.push("");

    longBreak.push("");
    longBreakPause.push("");
    longBreakDate.push("");
    longBreakNotes.push("");

    shortBreak.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
    shortBreakNotes.push(""); //note
    oldDate = currentDate;
    currentDate = new Date();
    shortBreakDate.push(
      oldDate.toLocaleString().split(", ")[1] +
        "~" +
        currentDate.toLocaleString().split(", ")[1]
    );
    if (seconds2 > 0) {
      shortBreakPause.push(
        " paused for " +
          (hours2 > 9 ? hours2 : "0" + hours2) +
          ":" +
          (minutes2 > 9 ? minutes2 : "0" + minutes2) +
          ":" +
          (seconds2 > 9 ? seconds2 : "0" + seconds2)
      );
    } else {
      shortBreakPause.push("");
    }
  } else if (buttonPressed == "long break") {
    totalSecondsLongBreak += totalSeconds;
    totalSeconds2LongBreakPause += totalSeconds2;

    pomodoro.push("");
    pomodoroPause.push("");
    pomodoroDate.push("");
    pomodoroNotes.push("");

    shortBreak.push("");
    shortBreakPause.push("");
    shortBreakDate.push("");
    shortBreakNotes.push("");

    longBreak.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
    longBreakNotes.push(""); //notes
    oldDate = currentDate;
    currentDate = new Date();
    longBreakDate.push(
      oldDate.toLocaleString().split(", ")[1] +
        "~" +
        currentDate.toLocaleString().split(", ")[1]
    );
    if (seconds2 > 0) {
      longBreakPause.push(
        " paused for " +
          (hours2 > 9 ? hours2 : "0" + hours2) +
          ":" +
          (minutes2 > 9 ? minutes2 : "0" + minutes2) +
          ":" +
          (seconds2 > 9 ? seconds2 : "0" + seconds2)
      );
    } else {
      longBreakPause.push("");
    }
  }
  displayResult();

  reset();
  buttonPressed = "pomodoro";
  let totalAlarmSeconds = alarmTime;
  alarmSeconds = totalAlarmSeconds % 60;
  alarmMinutes = Math.floor(totalAlarmSeconds / 60);
  alarmHours = Math.floor(totalAlarmSeconds / 3600);
  var current = document.querySelector("#current");
  current.textContent =
    "Pomodoro [" +
    (alarmHours > 9 ? alarmHours : "0" + alarmHours) +
    ":" +
    (alarmMinutes > 9 ? alarmMinutes : "0" + alarmMinutes) +
    ":" +
    (alarmSeconds > 9 ? alarmSeconds : "0" + alarmSeconds) +
    "] Pomodoro";
  clearInterval(myInterval);
  totalAlarmSeconds = alarmTime * 60;
  var paragraph = document.querySelector("#demo");
  paragraph.textContent = "00:00:00";
  totalSeconds = 0;
  var paragraph2 = document.querySelector("#demo2");
  paragraph2.textContent = "00:00:00";
  totalSeconds2 = 0;
  myInterval = setInterval(calculation, 1000);
  var button1 = document.querySelector("#button1");
  var button2 = document.querySelector("#button2");
  var button3 = document.querySelector("#button3");
  var button4 = document.querySelector("#button4");

  var pomodoro_time = document.querySelector("#pomodoro-time");
  var break_time = document.querySelector("#break-time");
  var long_break_time = document.querySelector("#long-break-time");

  var battr1 = document.createAttribute("disabled");
  var battr2 = document.createAttribute("disabled");
  button1.setAttributeNode(battr1);
  pomodoro_time.setAttributeNode(battr2);
  button2.removeAttribute("disabled");
  button3.removeAttribute("disabled");
  button4.removeAttribute("disabled");

  break_time.removeAttribute("disabled");
  long_break_time.removeAttribute("disabled");
  pauseButton.removeAttribute("disabled");

  alarmSoundisPlaying = false;
}

function startBreak() {
  hours = Math.floor(totalSeconds / 3600);
  hours2 = Math.floor(totalSeconds2 / 3600);

  totalSecondsPomodoro += totalSeconds;
  totalSeconds2PomodoroPause += totalSeconds2;

  if (firstButtonOfTheDay == false) {
    currentDate = new Date();
    firstButtonOfTheDay = true;
  }

  if (buttonPressed == "pomodoro") {
    shortBreak.push("");
    shortBreakPause.push("");
    shortBreakDate.push("");
    shortBreakNotes.push("");

    longBreak.push("");
    longBreakPause.push("");
    longBreakDate.push("");
    longBreakNotes.push("");

    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
    pomodoroNotes.push(""); //notes
    hours = Math.floor(totalSeconds2 / 3600);
    oldDate = currentDate;
    currentDate = new Date();
    pomodoroDate.push(
      oldDate.toLocaleString().split(", ")[1] +
        "~" +
        currentDate.toLocaleString().split(", ")[1]
    );
    if (seconds2 > 0) {
      pomodoroPause.push(
        " paused for " +
          (hours2 > 9 ? hours2 : "0" + hours2) +
          ":" +
          (minutes2 > 9 ? minutes2 : "0" + minutes2) +
          ":" +
          (seconds2 > 9 ? seconds : "0" + seconds2)
      );
    } else {
      pomodoroPause.push("");
    }
  }
  displayResult();

  buttonPressed = "break";

  pauseSound = new Audio("Chobits Opening.mp3");
  alarmSound.pause();
  alarmSound = new Audio("Cowboy Bebop.mp3");
  alarmTime =
    Number(totalSeconds) *
    Number("0." + document.getElementById("break-time").value);
  reset();

  let totalAlarmSeconds = alarmTime;
  alarmSeconds = totalAlarmSeconds % 60;
  alarmMinutes = Math.floor(totalAlarmSeconds / 60);
  alarmHours = Math.floor(totalAlarmSeconds / 3600);
  var current = document.querySelector("#current");
  current.textContent =
    "Break [" +
    (alarmHours > 9 ? alarmHours : "0" + alarmHours) +
    ":" +
    (alarmMinutes > 9 ? alarmMinutes : "0" + alarmMinutes) +
    ":" +
    (alarmSeconds > 9
      ? alarmSeconds.toFixed(0)
      : "0" + alarmSeconds.toFixed(0)) +
    "] Break";
  clearInterval(myInterval);
  var paragraph = document.querySelector("#demo");
  paragraph.textContent = "00:00:00";
  totalSeconds = 0;
  var paragraph2 = document.querySelector("#demo2");
  paragraph2.textContent = "00:00:00";
  totalSeconds2 = 0;
  myInterval = setInterval(calculation, 1000);
  var button1 = document.querySelector("#button1");
  var button2 = document.querySelector("#button2");
  var button3 = document.querySelector("#button3");
  var pomodoro_time = document.querySelector("#pomodoro-time");
  var break_time = document.querySelector("#break-time");
  var long_break_time = document.querySelector("#long-break-time");

  button1.removeAttribute("disabled");
  pomodoro_time.removeAttribute("disabled");
  var battr2 = document.createAttribute("disabled");
  var battr3 = document.createAttribute("disabled");
  button2.setAttributeNode(battr2);
  break_time.setAttributeNode(battr3);
  var battr4 = document.createAttribute("disabled");
  var battr5 = document.createAttribute("disabled");
  button3.setAttributeNode(battr4);
  long_break_time.setAttributeNode(battr5);
  pauseButton.removeAttribute("disabled");
  var button4 = document.querySelector("#button4");
  button4.removeAttribute("disabled");

  alarmSoundisPlaying = false;
}
function reset() {
  totalSeconds = 0;
  seconds = 0;
  minutes = 0;
  totalSeconds2 = 0;
  seconds2 = 0;
  minutes2 = 0;
}
function startLongBreak() {
  hours = Math.floor(totalSeconds / 3600);
  hours2 = Math.floor(totalSeconds2 / 3600);

  totalSecondsPomodoro += totalSeconds;
  totalSeconds2PomodoroPause += totalSeconds2;

  if (firstButtonOfTheDay == false) {
    currentDate = new Date();
    firstButtonOfTheDay = true;
  }

  if (buttonPressed == "pomodoro") {
    shortBreak.push("");
    shortBreakPause.push("");
    shortBreakDate.push("");
    shortBreakNotes.push("");

    longBreak.push("");
    longBreakPause.push("");
    longBreakDate.push("");
    longBreakNotes.push("");

    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
    pomodoroNotes.push(""); //notes
    hours = Math.floor(totalSeconds2 / 3600);
    oldDate = currentDate;
    currentDate = new Date();
    pomodoroDate.push(
      oldDate.toLocaleString().split(", ")[1] +
        "~" +
        currentDate.toLocaleString().split(", ")[1]
    );
    if (seconds2 > 0) {
      pomodoroPause.push(
        " paused for " +
          (hours2 > 9 ? hours2 : "0" + hours2) +
          ":" +
          (minutes2 > 9 ? minutes2 : "0" + minutes2) +
          ":" +
          (seconds2 > 9 ? seconds : "0" + seconds2)
      );
    } else {
      pomodoroPause.push("");
    }
  }
  displayResult();
  pauseSound = new Audio("Chobits Opening.mp3");
  alarmSound.pause();
  alarmSound = new Audio("Hype.mp3");
  alarmTime =
    Number(totalSeconds) *
    Number("0." + document.getElementById("long-break-time").value);

  reset();
  buttonPressed = "long break";
  let totalAlarmSeconds = alarmTime;
  alarmSeconds = totalAlarmSeconds % 60;
  alarmMinutes = Math.floor(totalAlarmSeconds / 60);
  alarmHours = Math.floor(totalAlarmSeconds / 3600);
  var current = document.querySelector("#current");
  current.textContent =
    "Long Break [" +
    (alarmHours > 9 ? alarmHours : "0" + alarmHours) +
    ":" +
    (alarmMinutes > 9 ? alarmMinutes : "0" + alarmMinutes) +
    ":" +
    (alarmSeconds > 9
      ? alarmSeconds.toFixed(0)
      : "0" + alarmSeconds.toFixed(0)) +
    "] Long Break";

  clearInterval(myInterval);
  var paragraph = document.querySelector("#demo");
  paragraph.textContent = "00:00:00";
  totalSeconds = 0;
  var paragraph2 = document.querySelector("#demo2");
  paragraph2.textContent = "00:00:00";
  totalSeconds2 = 0;
  myInterval = setInterval(calculation, 1000);
  var button1 = document.querySelector("#button1");
  var button2 = document.querySelector("#button2");
  var button3 = document.querySelector("#button3");
  var pomodoro_time = document.querySelector("#pomodoro-time");
  var break_time = document.querySelector("#break-time");
  var long_break_time = document.querySelector("#long-break-time");

  button1.removeAttribute("disabled");
  pomodoro_time.removeAttribute("disabled");
  var battr2 = document.createAttribute("disabled");
  var battr3 = document.createAttribute("disabled");
  button2.setAttributeNode(battr2);
  break_time.setAttributeNode(battr3);
  var battr4 = document.createAttribute("disabled");
  var battr5 = document.createAttribute("disabled");
  button3.setAttributeNode(battr4);
  long_break_time.setAttributeNode(battr5);
  pauseButton.removeAttribute("disabled");
  var button4 = document.querySelector("#button4");
  button4.removeAttribute("disabled");

  alarmSoundisPlaying = false;
}

function myPause() {
  alarmSound.pause();
  pauseSound.loop = true;
  pauseSound.play();

  clearInterval(myInterval);
  div2.removeChild(div2.lastChild);
  div2.appendChild(resumeButton);
  var button1 = document.querySelector("#button1");
  var button2 = document.querySelector("#button2");
  var button3 = document.querySelector("#button3");
  var pomodoro_time = document.querySelector("#pomodoro-time");
  var break_time = document.querySelector("#break-time");
  var long_break_time = document.querySelector("#long-break-time");
  var battr = document.createAttribute("disabled");
  var battr1 = document.createAttribute("disabled");
  button1.setAttributeNode(battr);
  pomodoro_time.setAttributeNode(battr1);
  var battr2 = document.createAttribute("disabled");
  var battr3 = document.createAttribute("disabled");
  button2.setAttributeNode(battr2);
  break_time.setAttributeNode(battr3);
  var battr4 = document.createAttribute("disabled");
  var battr5 = document.createAttribute("disabled");
  button3.setAttributeNode(battr4);
  long_break_time.setAttributeNode(battr5);

  myInterval2 = setInterval(calculation2, 1000);
}

function myResume() {
  pauseSound.loop = false;
  pauseSound.pause();
  if (alarmSoundisPlaying) {
    alarmSound.play();
  }
  var button1 = document.querySelector("#button1");
  var button2 = document.querySelector("#button2");
  var button3 = document.querySelector("#button3");
  var pomodoro_time = document.querySelector("#pomodoro-time");
  var break_time = document.querySelector("#break-time");
  var long_break_time = document.querySelector("#long-break-time");

  myInterval = setInterval(calculation, 1000);
  clearInterval(myInterval2);

  div2.removeChild(div2.lastChild);
  div2.appendChild(pauseButton);
  if (buttonPressed == "pomodoro") {
    button2.removeAttribute("disabled");
    break_time.removeAttribute("disabled");
    button3.removeAttribute("disabled");
    long_break_time.removeAttribute("disabled");
  } else {
    button1.removeAttribute("disabled");
    pomodoro_time.removeAttribute("disabled");
  }
}

var resumeButton = document.createElement("button");
resumeButton.textContent = "Resume";
var atr2 = document.createAttribute("onclick");
atr2.value = "myResume()";
resumeButton.setAttributeNode(atr2);

var pauseButton = document.createElement("button");
pauseButton.textContent = "Pause";
var atr1 = document.createAttribute("onclick");
var atr2 = document.createAttribute("disabled");
atr1.value = "myPause()";
pauseButton.setAttributeNode(atr1);
pauseButton.setAttributeNode(atr2);
var div2 = document.querySelector("#test2");

div2.appendChild(pauseButton);

function finishButton() {
  if (buttonPressed == "pomodoro") {
    totalSecondsPomodoro += totalSeconds;
    totalSeconds2PomodoroPause += totalSeconds2;
  } else if (buttonPressed == "break") {
    totalSecondsBreak += totalSeconds;
    totalSeconds2BreakPause += totalSeconds2;
  } else if (buttonPressed == "long break") {
    totalSecondsLongBreak += totalSeconds;
    totalSeconds2LongBreakPause += totalSeconds2;
  }

  clearInterval(myInterval);
  clearInterval(myInterval2);

  var button1 = document.querySelector("#button1");
  var button2 = document.querySelector("#button2");
  var button3 = document.querySelector("#button3");
  var button4 = document.querySelector("#button4");
  var pomodoro_time = document.querySelector("#pomodoro-time");
  var break_time = document.querySelector("#break-time");
  var long_break_time = document.querySelector("#long-break-time");

  var attr1 = document.createAttribute("disabled");
  var attr2 = document.createAttribute("disabled");
  var attr3 = document.createAttribute("disabled");
  var attr4 = document.createAttribute("disabled");
  var attr5 = document.createAttribute("disabled");
  var attr6 = document.createAttribute("disabled");
  var attr7 = document.createAttribute("disabled");
  var attr8 = document.createAttribute("disabled");
  var attr9 = document.createAttribute("disabled");

  button1.setAttributeNode(attr1);
  button2.setAttributeNode(attr2);
  button3.setAttributeNode(attr3);
  button4.setAttributeNode(attr4);
  pomodoro_time.setAttributeNode(attr5);
  break_time.setAttributeNode(attr6);
  long_break_time.setAttributeNode(attr7);
  pauseButton.setAttributeNode(attr8);
  resumeButton.setAttributeNode(attr9);

  document.querySelector("#current2").innerHTML =
    "Today's Pomodoro: " +
    displayTime(totalSecondsPomodoro) +
    " paused for : " +
    displayTime(totalSeconds2PomodoroPause) +
    "<br/>Today's break: " +
    displayTime(totalSecondsBreak) +
    " paused for : " +
    displayTime(totalSeconds2BreakPause) +
    "<br/>Today's long break: " +
    displayTime(totalSecondsLongBreak) +
    " paused for " +
    displayTime(totalSeconds2LongBreakPause);
}

function displayTime(customSeconds) {
  seconds = customSeconds % 60;
  minutes = Math.floor(customSeconds / 60);
  hours = Math.floor(customSeconds / 3600);
  string =
    (hours > 9 ? hours : "0" + hours) +
    ":" +
    (minutes > 9 ? minutes : "0" + minutes) +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);
  return string;
}

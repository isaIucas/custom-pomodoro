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

//store data points of desire pomodoro, break, and long break
let desirePomodoro = [];
let desireShortBreak = [];
let desireLongBreak = [];

//Format for visual outputs for
let desirePomodoroFormat = [];
let desireShortBreakFormat = [];
let desireLongBreakFormat = [];

let desireShortBreakPercentFormat = [];
let desireLongBreakPercentFormat = [];

//new tracking: Time Stamp
let oldDate;
let CurrentDate;

let pomodoroDate = [];
let shortBreakDate = [];
let longBreakDate = [];

let pomodoroDateDifference = [];
let shortBreakDateDifference = [];
let longBreakDateDifference = [];
//new tracking: Notes
let storeNotes = new Map();

//new tracking: additional data/following score
let storeEfficiency = new Map();

//total accumulation of seconds for displaying results
let totalSecondsPomodoro = 0;
let totalSeconds2PomodoroPause = 0;
let totalSecondsBreak = 0;
let totalSeconds2BreakPause = 0;
let totalSecondsLongBreak = 0;
let totalSeconds2LongBreakPause = 0;

//alarm sounds
let pomodoroCollections = [
  new Audio("./pomodoro/Kiznaiver.mp3"),
  new Audio("./pomodoro/SDR2 OST - -1-05- Beautiful Ruin [Summer Salt].mp3"),
  new Audio(
    "./pomodoro/Shin Megami Tensei IV OST - Ikebukuro Underground District.mp3"
  ),
  new Audio("./pomodoro/Tricolor Airline.mp3"),
];
let breakCollections = [
  new Audio("./break/Cowboy Bebop.mp3"),
  new Audio("./break/Hunter X Hunter - Opening 1 _ Departure!.mp3"),
  new Audio("./break/Naruto Shippuuden OP 1 Hero's Comeback.mp3"),
  new Audio("./break/One Piece Opening 1 - FUNimation dub - We Are!.mp3"),
  new Audio("./break/Person 3 opening edited.mp3"),
];
let pauseCollections = [
  new Audio("./pause/Chobits Opening.mp3"),
  new Audio("./pause/Elevator Music 1.mp3"),
  new Audio("./pause/Elevator Music 2.mp3"),
  new Audio("./pause/Kira's Theme (Elevator Music).mp3"),
  new Audio("./pause/Persona 3 OST.mp3"),
  new Audio("./pause/Yum Cha.mp3"),
];
let easterEgg = [new Audio("./easter egg/Among Us Drip Theme Song.mp3")];
let finishedCollections = [
  new Audio("./finished/Dragon Ball Ending Theme.mp3"),
  new Audio("./finished/Ending _ Yume de Sekai wo Kaeru nara.mp3"),
  new Audio("./finished/Ending 2 Nisekoi.mp3"),
  new Audio(
    "./finished/Fushigi no Dungeon - Torneko no Daibouken Eternal Happiness.mp3"
  ),
  new Audio("./finished/Hunter X Hunter - Ending 6.mp3"),
  new Audio("./finished/One Piece ED 08 - Shining ray.mp3"),
];
let longBreakCollections = [
  new Audio("./long break/Dragon Quest III Adventure.mp3"),
  new Audio("./long break/Hype.mp3"),
  new Audio("./long break/JoJo's Bizarre Adventure Opening 5.mp3"),
  new Audio("./long break/JoJo's Bizarre Adventure Opening 7.mp3"),
  new Audio(
    "./long break/meganeko - The Cyber Grind (Ultrakill Soundtrack).mp3"
  ),
];
let sfx = [
  new Audio("./sfx/44 Dragon Quest 4 - Small Prize.mp3"),
  new Audio("./sfx/45 Dragon Quest 4 - Win Big!.mp3"),
  new Audio("./sfx/46 Dragon Quest 4 - Jackpot!.mp3"),
];

//pomodoro 4, break 5, pause 6, easter 1, finished 6, long break 5, sfx 3
function randomNumberIndex(number) {
  return Math.floor(Math.random() * number);
}

let alarmSound =
  pomodoroCollections[randomNumberIndex(pomodoroCollections.length)];
let alarmTime;
let alarmSoundisPlaying = false;
let pauseSound = pauseCollections[randomNumberIndex(pauseCollections.length)];

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

//custom1||2||3div[index] position of table
function recordNote(
  ColumnIndex,
  dynamicDivStringIndex,
  dynamicNoteStringIndex,
  RowIndex
) {
  textBoxColumnRow = "text" + ColumnIndex + "Box" + RowIndex;
  clickNoteButton(
    dynamicDivStringIndex,
    dynamicNoteStringIndex,
    textBoxColumnRow,
    ColumnIndex,
    RowIndex
  );

  if (randomNumberIndex(10) == 0) {
    easterEgg[randomNumberIndex(easterEgg.length)].play();
  }

  var box = document.getElementById(dynamicDivStringIndex);
  var textBox = document.createElement("input");
  var textBoxAtr = document.createAttribute("id");
  var textBoxAtr2 = document.createAttribute("type");
  var textBoxAtr3 = document.createAttribute("value");

  var noteButton = document.getElementById(dynamicNoteStringIndex);
  textBoxAtr.value = textBoxColumnRow;
  textBoxAtr2.value = "text";
  if (storeNotes.get("note" + ColumnIndex + "Button" + RowIndex) == undefined) {
    textBox.placeholder = "Make your excuse";
  } else {
    textBoxAtr3.value = storeNotes.get(
      "note" + ColumnIndex + "Button" + RowIndex
    );
  }

  textBox.setAttributeNode(textBoxAtr);
  textBox.setAttributeNode(textBoxAtr2);
  textBox.setAttributeNode(textBoxAtr3);

  box.insertBefore(textBox, noteButton);
}

function clickNoteButton(
  dynamicDivStringIndex,
  dynamicNoteStringIndex,
  textBoxColumnRow,
  ColumnIndex,
  RowIndex
) {
  var box = document.getElementById(dynamicDivStringIndex);
  box.removeChild(box.lastChild);
  var noteButton = document.createElement("button");
  var noteButtonID = document.createAttribute("id");
  var noteButtonOnClick = document.createAttribute("onclick");
  noteButtonID.value = dynamicNoteStringIndex;
  noteButtonOnClick.value =
    "clickDoneButton(" +
    dynamicDivStringIndex +
    "," +
    dynamicNoteStringIndex +
    "," +
    textBoxColumnRow +
    "," +
    ColumnIndex +
    "," +
    RowIndex +
    ")";
  noteButton.setAttributeNode(noteButtonID);
  noteButton.setAttributeNode(noteButtonOnClick);

  noteButton.textContent = "done";
  box.appendChild(noteButton);
}

function clickDoneButton(
  dynamicDivStringIndex,
  dynamicNoteStringIndex,
  textBoxColumnRow,
  ColumnIndex,
  RowIndex
) {
  textBox = textBoxColumnRow.value;
  storeNotes.set(dynamicNoteStringIndex.id, textBox);

  var box = dynamicDivStringIndex;

  box.removeChild(box.lastChild);
  box.removeChild(box.lastChild);
  var textRecord = document.getElementById(
    "customDiv" + ColumnIndex + "Notes" + RowIndex
  );
  textRecord.textContent = storeNotes.get(dynamicNoteStringIndex.id);
  box.appendChild(textRecord);
  var noteButton = document.createElement("button");
  var noteButtonAtr = document.createAttribute("id");
  var noteButtonAtr2 = document.createAttribute("onclick");
  noteButtonAtr2.value =
    "recordNote(" +
    ColumnIndex +
    ",'custom" +
    ColumnIndex +
    "Div" +
    RowIndex +
    "', 'note" +
    ColumnIndex +
    "Button" +
    RowIndex +
    "'," +
    RowIndex +
    ")";
  noteButton.setAttributeNode(noteButtonAtr2);
  if (storeNotes.has("note" + ColumnIndex + "Button" + RowIndex)) {
    noteButton.textContent = "edit";
  } else {
    noteButton.textContent = "+";
  }
  noteButtonAtr.value = "note" + ColumnIndex + "Button" + RowIndex;
  noteButton.setAttributeNode(noteButtonAtr);
  box.appendChild(noteButton);
}

//This is important for retaining data for displaying
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
      document.getElementById("pomodoro-time").value + ":00";
      if (
        pomodoroDateDifference[i] >=
        Number(document.getElementById("pomodoro-time").value) * 60
      ) {
        document.getElementById("custom1Div" + i).style.backgroundColor =
          "LightGreen";
      } else {
        document.getElementById("custom1Div" + i).style.backgroundColor =
          "LightPink";
      }
      var smallerBox3 = document.createElement("div");
      var smallerBox3Atr = document.createAttribute("id");
      smallerBox3Atr.value = "customDiv1Notes" + i;
      smallerBox3.textContent = storeNotes.get("note1Button" + i);
      smallerBox3.setAttributeNode(smallerBox3Atr);
      box.appendChild(smallerBox3);

      var smallerBox4 = document.createElement("div");
      var smallerBox4Atr = document.createAttribute("id");
      var scoreEfficiency = (
        (pomodoroDateDifference[i] / (Number(desirePomodoro[i]) * 60)) *
        100
      ).toFixed(0);
      storeEfficiency.set("custom1DesireTime", [
        " Desire: " + desirePomodoroFormat[i],
        " Efficiency: " + scoreEfficiency + " %",
      ]);
      smallerBox4Atr.value = "custom1DesireTime";
      smallerBox4.textContent = storeEfficiency.get("custom1DesireTime");
      smallerBox4.setAttributeNode(smallerBox4Atr);
      box.appendChild(smallerBox4);

      var noteButton = document.createElement("button");
      var noteButtonAtr = document.createAttribute("id");
      var noteButtonAtr2 = document.createAttribute("onclick");
      noteButtonAtr2.value =
        "recordNote(1,'custom1Div" + i + "', 'note1Button" + i + "'," + i + ")";
      noteButton.setAttributeNode(noteButtonAtr2);
      if (storeNotes.has("note1Button" + i)) {
        noteButton.textContent = "edit";
      } else {
        noteButton.textContent = "+";
      }
      noteButtonAtr.value = "note1Button" + i;
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
      if (
        shortBreakDateDifference[i] <=
        pomodoroDateDifference[i - 1] *
          (Number("0." + document.getElementById("break-time").value) + 0.05) //0.05 or 5% is for time to click to still get LightGreen
      ) {
        document.getElementById("custom2Div" + i).style.backgroundColor =
          "LightGreen";
      } else {
        document.getElementById("custom2Div" + i).style.backgroundColor =
          "LightPink";
      }
      var smallerBox3 = document.createElement("div");
      var smallerBox3Atr = document.createAttribute("id");
      smallerBox3Atr.value = "customDiv2Notes" + i;
      smallerBox3.textContent = storeNotes.get("note2Button" + i);
      smallerBox3.setAttributeNode(smallerBox3Atr);
      box.appendChild(smallerBox3);

      var smallerBox4 = document.createElement("div");
      var smallerBox4Atr = document.createAttribute("id");

      var scoreEfficiency = (
        (formatToSeconds(desireShortBreakFormat[i]) /
          shortBreakDateDifference[i]) *
        100
      ).toFixed(0);
      storeEfficiency.set("custom2DesireTime", [
        " Desire: " + desireShortBreakFormat[i],
        desireShortBreakPercentFormat[i],
        " Efficiency: " + scoreEfficiency + " %",
      ]);
      smallerBox4Atr.value = "custom2DesireTime";
      smallerBox4.textContent = storeEfficiency.get("custom2DesireTime");
      smallerBox4.setAttributeNode(smallerBox4Atr);
      box.appendChild(smallerBox4);

      var noteButton = document.createElement("button");
      var noteButtonAtr = document.createAttribute("id");
      var noteButtonAtr2 = document.createAttribute("onclick");
      noteButtonAtr2.value =
        "recordNote(2,'custom2Div" + i + "', 'note2Button" + i + "'," + i + ")";
      noteButton.setAttributeNode(noteButtonAtr2);
      if (storeNotes.has("note2Button" + i)) {
        noteButton.textContent = "edit";
      } else {
        noteButton.textContent = "+";
      }
      noteButtonAtr.value = "note2Button" + i;
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
      if (
        longBreakDateDifference[i] <=
        pomodoroDateDifference[i - 1] *
          (Number("0." + document.getElementById("long-break-time").value) +
            0.05) //0.05 or 5% is for time to click to still get LightGreen
      ) {
        document.getElementById("custom3Div" + i).style.backgroundColor =
          "LightGreen";
      } else {
        document.getElementById("custom3Div" + i).style.backgroundColor =
          "LightPink";
      }
      var smallerBox3 = document.createElement("div");
      var smallerBox3Atr = document.createAttribute("id");
      smallerBox3Atr.value = "customDiv3Notes" + i;
      smallerBox3.textContent = storeNotes.get("note3Button" + i);
      smallerBox3.setAttributeNode(smallerBox3Atr);
      box.appendChild(smallerBox3);

      var smallerBox4 = document.createElement("div");
      var smallerBox4Atr = document.createAttribute("id");

      var scoreEfficiency = (
        (formatToSeconds(desireLongBreakFormat[i]) /
          longBreakDateDifference[i]) *
        100
      ).toFixed(0);
      storeEfficiency.set("custom3DesireTime", [
        " Desire: " + desireLongBreakFormat[i],
        desireLongBreakPercentFormat[i],
        " Efficiency: " + scoreEfficiency + " %",
      ]);
      smallerBox4Atr.value = "custom3DesireTime";
      smallerBox4.textContent = storeEfficiency.get("custom3DesireTime");
      smallerBox4.setAttributeNode(smallerBox4Atr);
      box.appendChild(smallerBox4);

      var noteButton = document.createElement("button");
      var noteButtonAtr = document.createAttribute("id");
      var noteButtonAtr2 = document.createAttribute("onclick");
      noteButtonAtr2.value =
        "recordNote(3,'custom3Div" + i + "', 'note3Button" + i + "'," + i + ")";
      noteButton.setAttributeNode(noteButtonAtr2);
      if (storeNotes.has("note3Button" + i)) {
        noteButton.textContent = "edit";
      } else {
        noteButton.textContent = "+";
      }
      noteButtonAtr.value = "note3Button" + i;
      noteButton.setAttributeNode(noteButtonAtr);
      box.appendChild(noteButton);
    }
  }
}

function formatToSeconds(format) {
  console.log("format: " + format);
  var array = format.split(":");
  seconds =
    Number(array[0]) * 3600 + Number(array[1]) * 60 + Number(array[2]) * 1;

  console.log("seconds: " + seconds);

  return seconds;
}

let firstButtonOfTheDay = false;

function startPomodoro() {
  if (firstButtonOfTheDay == false) {
    currentDate = new Date();
    firstButtonOfTheDay = true;
  }
  pauseSound = pauseCollections[randomNumberIndex(pauseCollections.length)];
  alarmSound.currentTime = 0;

  alarmSound.pause();
  alarmSound =
    pomodoroCollections[randomNumberIndex(pomodoroCollections.length)];
  alarmTime = document.getElementById("pomodoro-time").value * 60;

  let totalAlarmSeconds = alarmTime;
  alarmSeconds = totalAlarmSeconds % 60;
  alarmMinutes = Math.floor(totalAlarmSeconds / 60);
  alarmHours = Math.floor(totalAlarmSeconds / 3600);
  var current = document.querySelector("#current");
  var timeFormat =
    (alarmHours > 9 ? alarmHours : "0" + alarmHours) +
    ":" +
    (alarmMinutes > 9 ? alarmMinutes : "0" + alarmMinutes) +
    ":" +
    (alarmSeconds > 9 ? alarmSeconds : "0" + alarmSeconds);

  hours = Math.floor(totalSeconds / 3600);
  hours2 = Math.floor(totalSeconds2 / 3600);

  desirePomodoroFormat.push(timeFormat);
  desireShortBreakFormat.push("");
  desireLongBreakFormat.push("");

  desireShortBreakPercentFormat.push("");
  desireLongBreakPercentFormat.push("");

  if (buttonPressed == "break") {
    totalSecondsBreak += totalSeconds;
    totalSeconds2BreakPause += totalSeconds2;

    pomodoro.push("");
    pomodoroPause.push("");
    pomodoroDate.push("");
    pomodoroDateDifference.push("");
    desirePomodoro.push("");

    longBreak.push("");
    longBreakPause.push("");
    longBreakDate.push("");
    longBreakDateDifference.push("");
    desireLongBreak.push("");

    shortBreak.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    oldDate = currentDate;
    currentDate = new Date();
    secondsDifference = Math.floor(
      (currentDate.getTime() - oldDate.getTime()) / 1000
    );
    shortBreakDateDifference.push(secondsDifference);
    shortBreakDate.push(
      oldDate.toLocaleString().split(", ")[1] +
        "~" +
        currentDate.toLocaleString().split(", ")[1]
    );
    desireShortBreak.push(
      secondsDifference *
        Number("0." + document.getElementById("break-time").value)
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
    pomodoroDateDifference.push("");
    desirePomodoro.push("");

    shortBreak.push("");
    shortBreakPause.push("");
    shortBreakDate.push("");
    shortBreakDateDifference.push("");
    desireShortBreak.push("");

    longBreak.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
    desireLongBreak.push(document.getElementById("pomodoro-time").value);
    oldDate = currentDate;
    currentDate = new Date();
    longBreakDateDifference.push(
      Math.floor((currentDate.getTime() - oldDate.getTime()) / 1000)
    );

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

  current.textContent = "Pomodoro [" + timeFormat + "] Pomodoro";
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

  alarmTime =
    Number(totalSeconds) *
    Number("0." + document.getElementById("break-time").value);
  let totalAlarmSeconds = alarmTime;
  alarmSeconds = totalAlarmSeconds % 60;
  alarmMinutes = Math.floor(totalAlarmSeconds / 60);
  alarmHours = Math.floor(totalAlarmSeconds / 3600);
  var current = document.querySelector("#current");
  var timeFormat =
    (alarmHours > 9 ? alarmHours : "0" + alarmHours) +
    ":" +
    (alarmMinutes > 9 ? alarmMinutes : "0" + alarmMinutes) +
    ":" +
    (alarmSeconds > 9
      ? alarmSeconds.toFixed(0)
      : "0" + alarmSeconds.toFixed(0));

  desirePomodoroFormat.push("");
  desireShortBreakFormat.push(timeFormat);
  desireLongBreakFormat.push("");

  desireShortBreakPercentFormat.push(
    document.getElementById("break-time").value + "%"
  );
  desireLongBreakPercentFormat.push("");

  if (buttonPressed == "pomodoro") {
    shortBreak.push("");
    shortBreakPause.push("");
    shortBreakDate.push("");
    shortBreakDateDifference.push("");
    desireShortBreak.push("");

    longBreak.push("");
    longBreakPause.push("");
    longBreakDate.push("");
    longBreakDateDifference.push("");
    desireLongBreak.push("");

    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    desirePomodoro.push(document.getElementById("pomodoro-time").value);

    hours = Math.floor(totalSeconds2 / 3600);
    oldDate = currentDate;
    currentDate = new Date();
    pomodoroDateDifference.push(
      Math.floor((currentDate.getTime() - oldDate.getTime()) / 1000)
    );
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

  pauseSound = pauseCollections[randomNumberIndex(pauseCollections.length)];
  alarmSound.currentTime = 0;

  alarmSound.pause();
  alarmSound = breakCollections[randomNumberIndex(breakCollections.length)];

  displayResult();
  reset();

  buttonPressed = "break";

  current.textContent = "Break [" + timeFormat + "] Break";
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

  if (
    firstButtonOfTheDay &&
    Number(document.getElementById("pomodoro-time").value) * 120 <
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  ) {
    sfx[2].play();
  } else if (
    firstButtonOfTheDay &&
    Number(document.getElementById("pomodoro-time").value) * 60 <
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  ) {
    sfx[1].play();
  } else if (
    firstButtonOfTheDay &&
    Number(document.getElementById("pomodoro-time").value) * 60 >
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  ) {
    sfx[0].play();
  }

  if (firstButtonOfTheDay == false) {
    currentDate = new Date();
    firstButtonOfTheDay = true;
  }
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

  alarmTime =
    Number(totalSeconds) *
    Number("0." + document.getElementById("long-break-time").value);
  let totalAlarmSeconds = alarmTime;
  alarmSeconds = totalAlarmSeconds % 60;
  alarmMinutes = Math.floor(totalAlarmSeconds / 60);
  alarmHours = Math.floor(totalAlarmSeconds / 3600);
  var current = document.querySelector("#current");
  var timeFormat =
    (alarmHours > 9 ? alarmHours : "0" + alarmHours) +
    ":" +
    (alarmMinutes > 9 ? alarmMinutes : "0" + alarmMinutes) +
    ":" +
    (alarmSeconds > 9
      ? alarmSeconds.toFixed(0)
      : "0" + alarmSeconds.toFixed(0));
  desirePomodoroFormat.push("");
  desireShortBreakFormat.push("");
  desireLongBreakFormat.push(timeFormat);

  desireShortBreakPercentFormat.push("");
  desireLongBreakPercentFormat.push(
    document.getElementById("long-break-time").value + "%"
  );

  totalSecondsPomodoro += totalSeconds;
  totalSeconds2PomodoroPause += totalSeconds2;

  if (buttonPressed == "pomodoro") {
    shortBreak.push("");
    shortBreakPause.push("");
    shortBreakDate.push("");
    shortBreakDateDifference.push("");
    desireShortBreak.push("");

    longBreak.push("");
    longBreakPause.push("");
    longBreakDate.push("");
    longBreakDateDifference.push("");
    desireLongBreak.push("");

    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    desirePomodoro.push(document.getElementById("pomodoro-time").value);
    hours = Math.floor(totalSeconds2 / 3600);
    oldDate = currentDate;
    currentDate = new Date();
    pomodoroDateDifference.push(
      Math.floor((currentDate.getTime() - oldDate.getTime()) / 1000)
    );
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
  pauseSound = pauseCollections[randomNumberIndex(pauseCollections.length)];
  alarmSound.currentTime = 0;

  alarmSound.pause();
  alarmSound =
    longBreakCollections[randomNumberIndex(longBreakCollections.length)];

  displayResult();

  reset();

  buttonPressed = "long break";

  current.textContent = "Long Break [" + timeFormat + "] Long Break";

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
  console.log(
    document.getElementById("pomodoro-time").value +
      "<" +
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  );

  if (
    firstButtonOfTheDay &&
    Number(document.getElementById("pomodoro-time").value) * 120 <
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  ) {
    sfx[2].play();
  } else if (
    firstButtonOfTheDay &&
    Number(document.getElementById("pomodoro-time").value) * 60 <
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  ) {
    sfx[1].play();
  } else if (
    firstButtonOfTheDay &&
    Number(document.getElementById("pomodoro-time").value) * 60 >
      pomodoroDateDifference[pomodoroDateDifference.length - 1]
  ) {
    sfx[0].play();
  }

  if (firstButtonOfTheDay == false) {
    currentDate = new Date();
    firstButtonOfTheDay = true;
  }
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
  finishedCollections[randomNumberIndex(finishedCollections.length)].play();
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

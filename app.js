//count current time
let seconds = 0;
let minutes = 0;
let hours = 0;
let myInterval;

//count pause time
let seconds2 = 0;
let minutes2 = 0;
let hours2 = 0;

let myInterval2;

let buttonPressed = "";

//keeping track of data points
//tracking current time and pause time
//string = 00:00:00
let pomodoro = [];
let pomodoroPause = [];
let shortBreak = [];
let shortBreakPause = [];
let longBreak = [];
let longBreakPause = [];

//store data points of desire pomodoro, break, and long break
//string = 00:00:00
let desirePomodoro = [];
let desireShortBreak = [];
let desireLongBreak = [];

//Format for visual outputs for
let desirePomodoroFormat = [];
let desireShortBreakFormat = [];
let desireLongBreakFormat = [];

let desireShortBreakPercentFormat = [];
let desireLongBreakPercentFormat = [];

//tracking: Time Stamp
let oldDate;
let CurrentDate;

let pomodoroDate = [];
let shortBreakDate = [];
let longBreakDate = [];

let pomodoroDateDifference = [];
let shortBreakDateDifference = [];
let longBreakDateDifference = [];

//tracking: Notes
let storeNotes = new Map();

//tracking: additional data/following score
let storeEfficiency = new Map();

let splitTrack = [];

//overall pattern chart that projects collective data
let overallDuration = [];
let fluctuationDuration = 0;
let overallTimeOfDay = [];

//alarm sounds
let pomodoroCollections = [
  new Audio("./pomodoro/Kiznaiver.mp3"),
  new Audio("./pomodoro/SDR2 OST - -1-05- Beautiful Ruin [Summer Salt].mp3"),
  new Audio(
    "./pomodoro/Shin Megami Tensei IV OST - Ikebukuro Underground District.mp3"
  ),
  new Audio("./pomodoro/beginning.mp3"),
  new Audio("./pomodoro/Oh My.mp3"),
  new Audio("./pomodoro/Scoreboard by Apollos Hester - Songify This.mp3"),
  new Audio("./pomodoro/Undertale OST - 085 - Fallen Down (Reprise).mp3"),
  new Audio("./pomodoro/Tricolor Airline.mp3"),
  new Audio("./pomodoro/Uwa!! So Temperate♫.mp3"),
];
let breakCollections = [
  new Audio("./break/Cowboy Bebop.mp3"),
  new Audio("./break/Hunter X Hunter - Opening 1 _ Departure!.mp3"),
  new Audio("./break/Naruto Shippuuden OP 1 Hero's Comeback.mp3"),
  new Audio("./break/One Piece Opening 1 - FUNimation dub - We Are!.mp3"),
  new Audio("./break/Bruce Lee Remix - Be Water My Friend.mp3"),
  new Audio("./break/let go.mp3"),
  new Audio("./break/Undertale Mettaton EX Theme  Death By Glamour.mp3"),
  new Audio("./break/Undertale OST - 059 - Spider Dance.mp3"),
  new Audio("./break/Person 3 opening edited.mp3"),
];
let pauseCollections = [
  new Audio("./pause/Chobits Opening.mp3"),
  new Audio("./pause/Elevator Music 1.mp3"),
  new Audio("./pause/Elevator Music 2.mp3"),
  new Audio("./pause/Kira's Theme (Elevator Music).mp3"),
  new Audio("./pause/Persona 3 OST.mp3"),
  new Audio("./pause/Yum Cha.mp3"),
  new Audio("./pause/SwuM x bsd.u - Swishers.mp3"),
  new Audio(
    "./pause/t e l e p a t h テレパシー能力者 - 強い願望 (Strong Desire).mp3"
  ),
  new Audio("./pause/Wii Shop Channel.mp3"),
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
  new Audio("./finished/AKMU - 200 %.mp3"),
  new Audio("./finished/Ever 17 PSP Arrange OST - 19 - Heilmittel-.mp3"),
  new Audio(
    "./finished/Mister Rogers Remixed  Garden of Your Mind  PBS Digital Studios.mp3"
  ),
  new Audio(
    "./finished/My Hero Academia Season 3 – Opening Theme 2 – Make my story.mp3"
  ),
  new Audio("./finished/Simple Plan - Ordinary Life.mp3"),
  new Audio("./finished/Songify This - BELIEVE IN YOURSELF.mp3"),
  new Audio("./finished/Today Again So Pure A Blue.mp3"),
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
  new Audio("./long break/The Chemical Brothers - Go Ft Q-Tip.mp3"),
  new Audio("./long break/Time is running out.mp3"),
];
let sfx = [
  new Audio("./sfx/44 Dragon Quest 4 - Small Prize.mp3"),
  new Audio("./sfx/45 Dragon Quest 4 - Win Big!.mp3"),
  new Audio("./sfx/46 Dragon Quest 4 - Jackpot!.mp3"),
  new Audio("./sfx/M. Bison 'Yes Yes!' Widescreen HD reupload.mp3"),
];

function randomNumberIndex(number) {
  return Math.floor(Math.random() * number);
}

let alarmSound =
  pomodoroCollections[randomNumberIndex(pomodoroCollections.length)];
let alarmTime;
let alarmSoundisPlaying = false;
let pauseSound = pauseCollections[randomNumberIndex(pauseCollections.length)];

let start;
let countSecond = 0;
let accumulateSeconds = 0;
let startDifferenceResume = false;
let startAgain = false;

let startPause;
let countPauseSecond = 0;
let accumulatePauseSeconds = 0;
let startPauseDifferenceResume = false;

// Update the count down every 1 second
function calculation() {
  let current = new Date();
  if (startDifferenceResume) {
    accumulateSeconds = countSecond;
    startDifferenceResume = false;
  } else if (startAgain) {
    accumulateSeconds = 0;
    startAgain = false;
  }
  countSecond = accumulateSeconds + (+current - +start); //current - past

  seconds = Math.floor(countSecond / 1000) % 60;
  minutes = Math.floor(countSecond / 60000) % 60;
  hours = Math.floor(countSecond / 3600000) % 24;

  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML =
    (hours > 9 ? hours : "0" + hours) +
    ":" +
    (minutes > 9 ? minutes : "0" + minutes) +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  if (Math.ceil(Number(alarmTime)) == Number(seconds)) {
    alarmSound.play();
    alarmSoundisPlaying = true;
  }
}

function calculationPause() {
  let current = new Date();
  if (startPauseDifferenceResume) {
    accumulatePauseSeconds = countPauseSecond;
    startPauseDifferenceResume = false;
  }
  countPauseSecond = accumulatePauseSeconds + (+current - +startPause); //current - past

  seconds2 = Math.floor(countPauseSecond / 1000) % 60;
  minutes2 = Math.floor(countPauseSecond / 60000) % 60;
  hours2 = Math.floor(countPauseSecond / 3600000) % 24;

  // Output the result in an element with id="demo"
  document.getElementById("demo2").innerHTML =
    (hours2 > 9 ? hours2 : "0" + hours2) +
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

function run() {
  var number1 = document.getElementById("input1").value;
  var number2 = document.getElementById("input2").value;
  var number3 = document.getElementById("input3").value;
  document.getElementById("noideawhatsgoingon2").textContent =
    Number(number1) + Number(number2) + Number(number3);
}

function finishModal(columnIndex, rowIndex, which) {
  var number1 = document.getElementById("input1").value;
  var number2 = document.getElementById("input2").value;
  var number3 = document.getElementById("input3").value;
  var totalNumber = document.getElementById("noideawhatsgoingon").textContent;
  var whichWhich;
  var whichWhichDate;

  if (which == "pomodoro") {
    whichWhich = pomodoro;
    whichWhichDate = pomodoroDate;
    whichWhichDateDifference = pomodoroDateDifference;
  } else if (which == "short break") {
    whichWhich = shortBreak;
    whichWhichDate = shortBreakDate;
    whichWhichDateDifference = shortBreakDateDifference;
  } else if (which == "long break") {
    whichWhich = longBreak;
    whichWhichDate = longBreakDate;
    whichWhichDateDifference = longBreakDateDifference;
  }

  if (
    Number(number1) + Number(number3) == Number(totalNumber) ||
    Number(number1) + Number(number2) == Number(totalNumber)
  ) {
    splitTrack[rowIndex] = true;
    if (
      (Number(number1) == 0 && Number(number2) != 0 && Number(number3) == 0) ||
      (Number(number1) == 0 && Number(number2) == 0 && Number(number3) != 0) ||
      (Number(number1) != 0 && Number(number2) == 0 && Number(number3) != 0) ||
      (Number(number1) != 0 && Number(number2) != 0 && Number(number3) == 0) ||
      (Number(number1) != 0 && Number(number2) == 0 && Number(number3) == 0)
    ) {
      //all the manipulation of data split is here
      if (
        Number(number1) != 0 &&
        Number(number2) == 0 &&
        Number(number3) == 0
      ) {
        pomodoroDate[rowIndex] = whichWhichDate[rowIndex];
        pomodoroDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];

        Number(number1) < 10
          ? (pomodoro[rowIndex] = "00:0" + Number(number1) + ":00")
          : (pomodoro[rowIndex] = "00:" + Number(number1) + ":00");

        var scoreEfficiency = (
          (formatToSeconds(pomodoro[rowIndex]) /
            (Number(document.getElementById("pomodoro-time").value) * 60)) *
          100
        ).toFixed(0);

        storeEfficiency.set("custom1DesireTime" + rowIndex, [
          " Desire: " +
            minutesToFormat(
              Number(document.getElementById("pomodoro-time").value)
            ),
          " Efficiency: " + scoreEfficiency + " %",
          Number(scoreEfficiency),
        ]);
        shortBreakDate[rowIndex] = "";
        shortBreak[rowIndex] = "";
        longBreakDate[rowIndex] = "";
        longBreak[rowIndex] = "";
      } else if (
        Number(number1) != 0 &&
        Number(number2) != 0 &&
        Number(number3) == 0
      ) {
        pomodoroDate[rowIndex] = whichWhichDate[rowIndex];
        shortBreakDate[rowIndex] = whichWhichDate[rowIndex];
        pomodoroDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];
        shortBreakDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];

        Number(number1) < 10
          ? (pomodoro[rowIndex] = "00:0" + Number(number1) + ":00")
          : (pomodoro[rowIndex] = "00:" + Number(number1) + ":00");
        Number(number2) < 10
          ? (shortBreak[rowIndex] = "00:0" + Number(number2) + ":00")
          : (shortBreak[rowIndex] = "00:" + Number(number2) + ":00");

        var scoreEfficiency = (
          (formatToSeconds(pomodoro[rowIndex]) /
            (Number(document.getElementById("pomodoro-time").value) * 60)) *
          100
        ).toFixed(0);

        storeEfficiency.set("custom1DesireTime" + rowIndex, [
          " Desire: " +
            minutesToFormat(
              Number(document.getElementById("pomodoro-time").value)
            ),
          " Efficiency: " + scoreEfficiency + " %",
          Number(scoreEfficiency),
        ]);
        let desire = secondsToFormat(
          Number(number1) *
            60 *
            Number("0." + document.getElementById("break-time").value)
        );
        var scoreEfficiency2 = (
          (formatToSeconds(desire) / (Number(number2) * 60)) *
          100
        ).toFixed(0);
        console.log("formatToSeconds(desire): " + formatToSeconds(desire));

        storeEfficiency.set("custom2DesireTime" + rowIndex, [
          " Desire: " + desire,
          " | " + document.getElementById("break-time").value + "%" + " | ",
          " Efficiency: " + scoreEfficiency2 + " %",
          Number(scoreEfficiency2),
        ]);

        longBreakDate[rowIndex] = "";
        longBreak[rowIndex] = "";
      } else if (
        Number(number1) != 0 &&
        Number(number2) == 0 &&
        Number(number3) != 0
      ) {
        pomodoroDate[rowIndex] = whichWhichDate[rowIndex];
        longBreakDate[rowIndex] = whichWhichDate[rowIndex];
        pomodoroDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];
        longBreakDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];

        Number(number1) < 10
          ? (pomodoro[rowIndex] = "00:0" + Number(number1) + ":00")
          : (pomodoro[rowIndex] = "00:" + Number(number1) + ":00");
        Number(number3) < 10
          ? (longBreak[rowIndex] = "00:0" + Number(number3) + ":00")
          : (longBreak[rowIndex] = "00:" + Number(number3) + ":00");

        var scoreEfficiency = (
          (formatToSeconds(pomodoro[rowIndex]) /
            (Number(document.getElementById("pomodoro-time").value) * 60)) *
          100
        ).toFixed(0);

        storeEfficiency.set("custom1DesireTime" + rowIndex, [
          " Desire: " +
            minutesToFormat(
              Number(document.getElementById("pomodoro-time").value)
            ),
          " Efficiency: " + scoreEfficiency + " %",
          Number(scoreEfficiency),
        ]);

        desire = secondsToFormat(
          Number(number1) *
            60 *
            Number("0." + document.getElementById("long-break-time").value)
        );

        var scoreEfficiency2 = (
          (formatToSeconds(desire) / (Number(number3) * 60)) *
          100
        ).toFixed(0);
        storeEfficiency.set("custom3DesireTime" + rowIndex, [
          " Desire: " + desire,
          " | " +
            document.getElementById("long-break-time").value +
            "%" +
            " | ",
          " Efficiency: " + scoreEfficiency2 + " %",
          Number(scoreEfficiency2),
        ]);
        shortBreakDate[rowIndex] = "";
        shortBreak[rowIndex] = "";
      } else if (
        Number(number1) == 0 &&
        Number(number2) != 0 &&
        Number(number3) == 0
      ) {
        shortBreakDate[rowIndex] = whichWhichDate[rowIndex];
        shortBreakDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];

        Number(number2) < 10
          ? (shortBreak[rowIndex] = "00:0" + Number(number2) + ":00")
          : (shortBreak[rowIndex] = "00:" + Number(number2) + ":00");

        var scoreEfficiency = (
          (0 / formatToSeconds(shortBreak[rowIndex])) *
          100
        ).toFixed(0);

        storeEfficiency.set("custom2DesireTime" + rowIndex, [
          " Desire: " + secondsToFormat(0),
          " | " + document.getElementById("break-time").value + "%" + " | ",
          " Efficiency: " + scoreEfficiency + " %",
          Number(scoreEfficiency),
        ]);

        pomodoroDate[rowIndex] = "";
        pomodoro[rowIndex] = "";
        longBreakDate[rowIndex] = "";
        longBreak[rowIndex] = "";
      } else if (
        Number(number1) == 0 &&
        Number(number2) == 0 &&
        Number(number3) != 0
      ) {
        longBreakDate[rowIndex] = whichWhichDate[rowIndex];
        longBreakDateDifference[rowIndex] = whichWhichDateDifference[rowIndex];

        Number(number3) < 10
          ? (longBreak[rowIndex] = "00:0" + Number(number3) + ":00")
          : (longBreak[rowIndex] = "00:" + Number(number3) + ":00");

        var scoreEfficiency = (
          (0 / formatToSeconds(longBreak[rowIndex])) *
          100
        ).toFixed(0);

        storeEfficiency.set("custom3DesireTime" + rowIndex, [
          " Desire: " + secondsToFormat(0),
          " | " +
            document.getElementById("long-break-time").value +
            "%" +
            " | ",
          " Efficiency: " + scoreEfficiency + " %",
          Number(scoreEfficiency),
        ]);
        pomodoroDate[rowIndex] = "";
        pomodoro[rowIndex] = "";
        shortBreakDate[rowIndex] = "";
        shortBreak[rowIndex] = "";
      }

      document.querySelector(".customModal").style.display = "none";
      var customDivv = document.getElementById(
        "custom" + columnIndex + "Div" + rowIndex
      );
      customDivv.removeChild(customDivv.lastChild);

      displayResult();
    }
  } else {
    if (Number(number1) == 0 && Number(number2) != 0 && Number(number3) != 0) {
      alert("You can't have break and long break at the same time.");
    } else if (
      !(
        (Number(number1) != 0 &&
          Number(number2) == 0 &&
          Number(number3) != 0) ||
        (Number(number1) != 0 && Number(number2) != 0 && Number(number3) == 0)
      )
    ) {
      alert("One of three option must be 0.");
    } else {
      alert(
        totalNumber +
          " does not equal to " +
          (Number(number1) + Number(number2) + Number(number3)) +
          " minutes."
      );
    }
  }
}

function splitTime(columnIndex, customDiv, customSplit, rowIndex, which) {
  var modal = document.createElement("div");
  var modalAtr = document.createAttribute("class");
  modalAtr.value = "customModal";
  modal.setAttributeNode(modalAtr);

  var customDivBox = document.getElementById(customDiv);
  customDivBox.appendChild(modal);

  var modalContent = document.createElement("div");
  var modalContentAtr = document.createAttribute("id");
  modalContentAtr.value = "modal-content";
  modalContent.setAttributeNode(modalContentAtr);
  modal.appendChild(modalContent);

  var modalContentSpan = document.createElement("span");
  var modalContentSpanAtr = document.createAttribute("class");
  modalContentSpanAtr.value = "close";
  modalContentSpan.innerHTML = "&times;";
  modalContentSpan.setAttributeNode(modalContentSpanAtr);
  modalContent.appendChild(modalContentSpan);

  var modalContentp = document.createElement("p");
  if (which == "pomodoro") {
    modalContentp.textContent =
      "Splitting pomodoro minutes: " +
      pomodoroDate[rowIndex] +
      " " +
      pomodoro[rowIndex] +
      pomodoroPause[rowIndex];
    originalNumber = Math.floor(pomodoroDateDifference[rowIndex] / 60);
  } else if (which == "short break") {
    modalContentp.textContent =
      "Splitting short break minutes: " +
      shortBreakDate[rowIndex] +
      " " +
      shortBreak[rowIndex] +
      shortBreakPause[rowIndex];
    originalNumber = Math.floor(shortBreakDateDifference[rowIndex] / 60);
  } else if (which == "long break") {
    modalContentp.textContent =
      "Splitting long break minutes: " +
      longBreakDate[rowIndex] +
      " " +
      longBreak[rowIndex] +
      longBreakPause[rowIndex];
    originalNumber = Math.floor(longBreakDateDifference[rowIndex] / 60);
  }

  var modalContentp2 = document.createElement("p");
  var modalContentp2atr = document.createAttribute("id");
  modalContentp2atr.value = "noideawhatsgoingon";
  modalContentp2.setAttributeNode(modalContentp2atr);

  var modalContentp3 = document.createElement("p");
  var modalContentp3atr = document.createAttribute("id");
  modalContentp3atr.value = "noideawhatsgoingon2";
  modalContentp3.setAttributeNode(modalContentp3atr);

  modalContentp2.textContent = originalNumber;

  var modalContentInput1 = document.createElement("input");
  var modalContentInput1Atr = document.createAttribute("id");
  modalContentInput1Atr.value = "input1";
  var modalContentInput1Atr2 = document.createAttribute("type");
  modalContentInput1Atr2.value = "number";
  var modalContentInput1Atr3 = document.createAttribute("value");
  modalContentInput1Atr3.value = "0";
  var modalContentInput1Atr4 = document.createAttribute("min");
  modalContentInput1Atr4.value = "0";
  var modalContentInput1Atr5 = document.createAttribute("max");
  modalContentInput1Atr5.value = modalContentp2.textContent;
  var modalContentInput1Atr6 = document.createAttribute("onclick");
  modalContentInput1Atr6.value = "run()";
  modalContentInput1.setAttributeNode(modalContentInput1Atr);
  modalContentInput1.setAttributeNode(modalContentInput1Atr2);
  modalContentInput1.setAttributeNode(modalContentInput1Atr3);
  modalContentInput1.setAttributeNode(modalContentInput1Atr4);
  modalContentInput1.setAttributeNode(modalContentInput1Atr5);
  modalContentInput1.setAttributeNode(modalContentInput1Atr6);

  var modalContentInput2 = document.createElement("input");
  var modalContentInput2Atr = document.createAttribute("id");
  modalContentInput2Atr.value = "input2";
  var modalContentInput2Atr2 = document.createAttribute("type");
  modalContentInput2Atr2.value = "number";
  var modalContentInput2Atr3 = document.createAttribute("value");
  modalContentInput2Atr3.value = "0";
  var modalContentInput2Atr4 = document.createAttribute("min");
  modalContentInput2Atr4.value = "0";
  var modalContentInput2Atr5 = document.createAttribute("max");
  modalContentInput2Atr5.value = modalContentp2.textContent;
  var modalContentInput2Atr6 = document.createAttribute("onclick");
  modalContentInput2Atr6.value = "run()";
  modalContentInput2.setAttributeNode(modalContentInput2Atr);
  modalContentInput2.setAttributeNode(modalContentInput2Atr2);
  modalContentInput2.setAttributeNode(modalContentInput2Atr3);
  modalContentInput2.setAttributeNode(modalContentInput2Atr4);
  modalContentInput2.setAttributeNode(modalContentInput2Atr5);
  modalContentInput2.setAttributeNode(modalContentInput2Atr6);

  var modalContentInput3 = document.createElement("input");
  var modalContentInput3Atr = document.createAttribute("id");
  modalContentInput3Atr.value = "input3";
  var modalContentInput3Atr2 = document.createAttribute("type");
  modalContentInput3Atr2.value = "number";
  var modalContentInput3Atr3 = document.createAttribute("value");
  modalContentInput3Atr3.value = "0";
  var modalContentInput3Atr4 = document.createAttribute("min");
  modalContentInput3Atr4.value = "0";
  var modalContentInput3Atr5 = document.createAttribute("max");
  modalContentInput3Atr5.value = modalContentp2.textContent;
  var modalContentInput3Atr6 = document.createAttribute("onclick");
  modalContentInput3Atr6.value = "run()";
  modalContentInput3.setAttributeNode(modalContentInput3Atr);
  modalContentInput3.setAttributeNode(modalContentInput3Atr2);
  modalContentInput3.setAttributeNode(modalContentInput3Atr3);
  modalContentInput3.setAttributeNode(modalContentInput3Atr4);
  modalContentInput3.setAttributeNode(modalContentInput3Atr5);
  modalContentInput3.setAttributeNode(modalContentInput3Atr6);

  var modalFinish = document.createElement("button");
  var modalFinishAtr = document.createAttribute("id");
  var modalFinishAtr2 = document.createAttribute("onclick");
  modalFinishAtr2.value =
    "finishModal(" + columnIndex + "," + rowIndex + ", '" + which + "')";
  modalFinishAtr.value = "finishModal";
  modalFinish.textContent = "Split";
  modalFinish.setAttributeNode(modalFinishAtr);
  modalFinish.setAttributeNode(modalFinishAtr2);

  modalContent.appendChild(modalContentp);
  modalContent.appendChild(modalContentp2);
  modalContent.appendChild(modalContentInput1);
  modalContent.appendChild(modalContentInput2);
  modalContent.appendChild(modalContentInput3);
  modalContent.appendChild(modalContentp3);
  modalContent.appendChild(modalFinish);

  //id is dynamic thus this is required and not in css
  modal.style.display = "none"; /* Hidden by default */
  modal.style.position = "fixed"; // Stay in place
  modal.style.z_index = "1"; /* Sit on top */
  modal.style.padding_top = "100px"; // Location of the box
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%"; // Full width
  modal.style.height = "100%"; // Full height
  modal.style.overflow = "auto"; // Enable scroll if needed
  modal.style.background_color = "rgb(0,0,0)"; /* Fallback color */
  modal.style.background_color = "rgba(0,0,0,0.4)"; // Black w/ opacity      */

  var customSplit = document.getElementById(customSplit);

  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      var customDivv = document.getElementById(
        "custom" + columnIndex + "Div" + rowIndex
      );
      customDivv.removeChild(customDivv.lastChild);
    }
  };

  var close = document.querySelector(".close");
  close.onclick = function () {
    modal.style.display = "none";
    var customDivv = document.getElementById(
      "custom" + columnIndex + "Div" + rowIndex
    );
    customDivv.removeChild(customDivv.lastChild);
  };
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
    box.style.height = "32px";
    box.style.alignItems = "center";

    var smallerBox = document.createElement("div");
    var smallerBoxAtr = document.createAttribute("id");
    smallerBoxAtr.value = "customDivDate";
    smallerBox.setAttributeNode(smallerBoxAtr);

    var smallerBox2 = document.createElement("div");
    var smallerBox2Atr = document.createAttribute("id");
    smallerBox2Atr.value = "customDivTime";
    smallerBox2.setAttributeNode(smallerBox2Atr);

    smallerBox.textContent = pomodoroDate[i];
    smallerBox2.textContent =
      pomodoro[i] +
      pomodoroPause[i] +
      "=> " +
      secondsToFormat(pomodoroDateDifference[i]);

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

      if (pomodoro[i] != "00:00:00") {
        var smallerBox4 = document.createElement("div");
        var smallerBox4Atr = document.createAttribute("id");
        smallerBox4Atr.value = "custom1DesireTime" + i;
        if (splitTrack[i] == false) {
          var scoreEfficiency = (
            (pomodoroDateDifference[i] / (Number(desirePomodoro[i]) * 60)) *
            100
          ).toFixed(0);
          storeEfficiency.set("custom1DesireTime" + i, [
            " Desire: " + desirePomodoroFormat[i],
            " Efficiency: " + scoreEfficiency + " %",
            Number(scoreEfficiency),
          ]);
        }

        smallerBox4.textContent =
          storeEfficiency.get("custom1DesireTime" + i)[0] +
          storeEfficiency.get("custom1DesireTime" + i)[1];
        smallerBox4.setAttributeNode(smallerBox4Atr);
        box.appendChild(smallerBox4);

        var splitButton = document.createElement("button");
        var splitButtonAtr = document.createAttribute("id");
        var splitButtonAtr2 = document.createAttribute("onclick");
        splitButtonAtr2.value =
          "splitTime(1,'custom1Div" +
          i +
          "', 'split1Button" +
          i +
          "'," +
          i +
          ", 'pomodoro'" +
          ")";
        splitButton.setAttributeNode(splitButtonAtr2);
        splitButton.textContent = "split";
        splitButtonAtr.value = "split1Button" + i;
        splitButton.setAttributeNode(splitButtonAtr);

        box.appendChild(splitButton);

        var noteButton = document.createElement("button");
        var noteButtonAtr = document.createAttribute("id");
        var noteButtonAtr2 = document.createAttribute("onclick");
        noteButtonAtr2.value =
          "recordNote(1,'custom1Div" +
          i +
          "', 'note1Button" +
          i +
          "'," +
          i +
          ")";
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
    box.style.height = "32px";
    box.style.alignItems = "center";

    var smallerBox = document.createElement("div");
    var smallerBoxAtr = document.createAttribute("id");
    smallerBoxAtr.value = "customDivDate";
    smallerBox.setAttributeNode(smallerBoxAtr);

    var smallerBox2 = document.createElement("div");
    var smallerBox2Atr = document.createAttribute("id");
    smallerBox2Atr.value = "customDivTime";
    smallerBox2.setAttributeNode(smallerBox2Atr);

    smallerBox.textContent = shortBreakDate[i];
    smallerBox2.textContent =
      shortBreak[i] +
      shortBreakPause[i] +
      "=> " +
      secondsToFormat(shortBreakDateDifference[i]);
    "[ " + secondsToFormat(shortBreakDateDifference[i]) + "] ";

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

      if (shortBreak[i] != "00:00:00") {
        var smallerBox4 = document.createElement("div");
        var smallerBox4Atr = document.createAttribute("id");
        if (splitTrack[i] == false) {
          var scoreEfficiency = (
            (formatToSeconds(desireShortBreakFormat[i]) /
              shortBreakDateDifference[i]) *
            100
          ).toFixed(0);
          storeEfficiency.set("custom2DesireTime" + i, [
            " Desire: " + desireShortBreakFormat[i],
            " | " + desireShortBreakPercentFormat[i] + " | ",
            " Efficiency: " + scoreEfficiency + " %",
            Number(scoreEfficiency),
          ]);
        }
        smallerBox4Atr.value = "custom2DesireTime" + i;
        smallerBox4.textContent =
          storeEfficiency.get("custom2DesireTime" + i)[0] +
          storeEfficiency.get("custom2DesireTime" + i)[1] +
          storeEfficiency.get("custom2DesireTime" + i)[2];
        smallerBox4.setAttributeNode(smallerBox4Atr);
        box.appendChild(smallerBox4);

        var splitButton = document.createElement("button");
        var splitButtonAtr = document.createAttribute("id");
        var splitButtonAtr2 = document.createAttribute("onclick");
        splitButtonAtr2.value =
          "splitTime(2,'custom2Div" +
          i +
          "', 'split2Button" +
          i +
          "'," +
          i +
          ", 'short break'" +
          ")";
        splitButton.setAttributeNode(splitButtonAtr2);
        splitButton.textContent = "split";
        splitButtonAtr.value = "split2Button" + i;
        splitButton.setAttributeNode(splitButtonAtr);

        box.appendChild(splitButton);

        var noteButton = document.createElement("button");
        var noteButtonAtr = document.createAttribute("id");
        var noteButtonAtr2 = document.createAttribute("onclick");
        noteButtonAtr2.value =
          "recordNote(2,'custom2Div" +
          i +
          "', 'note2Button" +
          i +
          "'," +
          i +
          ")";
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
    box.style.height = "32px";
    box.style.alignItems = "center";

    var smallerBox = document.createElement("div");
    var smallerBoxAtr = document.createAttribute("id");
    smallerBoxAtr.value = "customDivDate";
    smallerBox.setAttributeNode(smallerBoxAtr);

    var smallerBox2 = document.createElement("div");
    var smallerBox2Atr = document.createAttribute("id");
    smallerBox2Atr.value = "customDivTime";
    smallerBox2.setAttributeNode(smallerBox2Atr);

    smallerBox.textContent = longBreakDate[i];
    smallerBox2.textContent =
      longBreak[i] +
      longBreakPause[i] +
      "=> " +
      secondsToFormat(longBreakDateDifference[i]);
    "[ " + secondsToFormat(longBreakDateDifference[i]) + "] ";

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

      if (longBreak[i] != "00:00:00") {
        var smallerBox4 = document.createElement("div");
        var smallerBox4Atr = document.createAttribute("id");
        if (splitTrack[i] == false) {
          var scoreEfficiency = (
            (formatToSeconds(desireLongBreakFormat[i]) /
              longBreakDateDifference[i]) *
            100
          ).toFixed(0);
          storeEfficiency.set("custom3DesireTime" + i, [
            " Desire: " + desireLongBreakFormat[i],
            " | " + desireLongBreakPercentFormat[i] + " | ",
            " Efficiency: " + scoreEfficiency + " %",
            Number(scoreEfficiency),
          ]);
        }
        smallerBox4Atr.value = "custom3DesireTime" + i;
        smallerBox4.textContent =
          storeEfficiency.get("custom3DesireTime" + i)[0] +
          storeEfficiency.get("custom3DesireTime" + i)[1] +
          storeEfficiency.get("custom3DesireTime" + i)[2];
        smallerBox4.setAttributeNode(smallerBox4Atr);
        box.appendChild(smallerBox4);

        var splitButton = document.createElement("button");
        var splitButtonAtr = document.createAttribute("id");
        var splitButtonAtr2 = document.createAttribute("onclick");
        splitButtonAtr2.value =
          "splitTime(3,'custom3Div" +
          i +
          "', 'split3Button" +
          i +
          "'," +
          i +
          ", 'long break'" +
          ")";
        splitButton.setAttributeNode(splitButtonAtr2);
        splitButton.textContent = "split";
        splitButtonAtr.value = "split3Button" + i;
        splitButton.setAttributeNode(splitButtonAtr);

        box.appendChild(splitButton);

        var noteButton = document.createElement("button");
        var noteButtonAtr = document.createAttribute("id");
        var noteButtonAtr2 = document.createAttribute("onclick");
        noteButtonAtr2.value =
          "recordNote(3,'custom3Div" +
          i +
          "', 'note3Button" +
          i +
          "'," +
          i +
          ")";
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
    if (splitTrack[i] == true) {
      if (pomodoro[i] != "") {
        document.getElementById("custom1Div" + i).style.backgroundColor =
          "LightYellow";
      }
      if (shortBreak[i] != "") {
        document.getElementById("custom2Div" + i).style.backgroundColor =
          "LightYellow";
      }
      if (longBreak[i] != "") {
        document.getElementById("custom3Div" + i).style.backgroundColor =
          "LightYellow";
      }
    }
  }
}

function formatToSeconds(format) {
  var array = format.split(":");
  seconds =
    Number(array[0]) * 3600 + Number(array[1]) * 60 + Number(array[2]) * 1;
  return seconds;
}

function minutesToFormat(min) {
  hr = Math.floor(min / 60);
  min = min % 60;
  hourFormat = hr < 10 ? "0" + hr : hr;
  minuteFormat = min < 10 ? "0" + min : min;
  return hourFormat + ":" + minuteFormat + ":00";
}

function secondsToFormat(sec) {
  hr = Math.floor(sec / 3600);
  min = Math.floor(sec / 60);
  sec = sec % 60;
  hourFormat = hr < 10 ? "0" + hr : hr;
  minuteFormat = min < 10 ? "0" + min : min;
  secondFormat = sec < 10 ? "0" + sec : sec;

  return hourFormat + ":" + minuteFormat + ":" + secondFormat;
}

let firstButtonOfTheDay = false;

function startPomodoro() {
  startAgain = true;
  start = new Date();

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
  /*
  hours = Math.floor(countSecond / 3600);
  hours2 = Math.floor(countPauseSecond / 3600);
*/
  desirePomodoroFormat.push(timeFormat);
  desireShortBreakFormat.push("");
  desireLongBreakFormat.push("");

  desireShortBreakPercentFormat.push("");
  desireLongBreakPercentFormat.push("");

  if (buttonPressed == "break") {
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

    splitTrack.push(false);

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

    splitTrack.push(false);

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
  countSecond = 0;
  var paragraph2 = document.querySelector("#demo2");
  paragraph2.textContent = "00:00:00";
  countPauseSecond = 0;
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
  startAgain = true;

  start = new Date();
  /*
  hours = Math.floor(countSecond / 3600000);
  hours2 = Math.floor(countPauseSecond / 3600000);
*/
  if (firstButtonOfTheDay == false) {
    alarmTime = 0;
  } else {
    alarmTime =
      Math.floor(countSecond / 1000) *
      Number("0." + document.getElementById("break-time").value);
  }

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

    splitTrack.push(false);
    console.log("hours: " + hours);
    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    desirePomodoro.push(document.getElementById("pomodoro-time").value);

    //hours = Math.floor(countPauseSecond / 3600);
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
  countSecond = 0;
  var paragraph2 = document.querySelector("#demo2");
  paragraph2.textContent = "00:00:00";
  countPauseSecond = 0;
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
  countSecond = 0;
  seconds = 0;
  minutes = 0;
  countPauseSecond = 0;
  seconds2 = 0;
  minutes2 = 0;
}
function startLongBreak() {
  startAgain = true;

  start = new Date();
  /*
  hours = Math.floor(countSecond / 3600);
  hours2 = Math.floor(countPauseSecond / 3600);
*/
  if (firstButtonOfTheDay == false) {
    alarmTime = 0;
  } else {
    alarmTime =
      Math.floor(countSecond / 1000) *
      Number("0." + document.getElementById("long-break-time").value);
  }

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

    splitTrack.push(false);

    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    desirePomodoro.push(document.getElementById("pomodoro-time").value);

    //hours = Math.floor(countPauseSecond / 3600);
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
  countSecond = 0;
  var paragraph2 = document.querySelector("#demo2");
  paragraph2.textContent = "00:00:00";
  countPauseSecond = 0;
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

function myPause() {
  startPauseDifferenceResume = true;
  startPause = new Date();
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

  myInterval2 = setInterval(calculationPause, 1000);
}

function myResume() {
  startDifferenceResume = true;
  start = new Date();
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
  alarmSound.pause();
  finishedCollections[randomNumberIndex(finishedCollections.length)].play();
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

    splitTrack.push(false);

    pomodoro.push(
      (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    desirePomodoro.push(document.getElementById("pomodoro-time").value);

    //hours = Math.floor(countPauseSecond / 3600);
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
  } else if (buttonPressed == "break") {
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

    splitTrack.push(false);

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

    splitTrack.push(false);

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

  var x_pomodoroValues = [];
  var y_pomodoroValues = [];
  pomodoroSession = 1;
  pomodoroMaxEfficiency = 100;

  for (i = 0; i < pomodoro.length; i++) {
    if (pomodoro[i] != "") {
      x_pomodoroValues.push(pomodoroSession);
      efficiencyNumber = storeEfficiency.get("custom1DesireTime" + i)[2];
      y_pomodoroValues.push(efficiencyNumber);
      pomodoroSession += 1;
      if (efficiencyNumber > pomodoroMaxEfficiency) {
        pomodoroMaxEfficiency = efficiencyNumber;
      }
    }
  }

  var x_shortBreakValues = [];
  var y_shortBreakValues = [];
  shortBreakSession = 1;
  shortBreakMaxEfficiency = 100;

  for (i = 0; i < shortBreak.length; i++) {
    if (shortBreak[i] != "") {
      x_shortBreakValues.push(shortBreakSession);
      efficiencyNumber = storeEfficiency.get("custom2DesireTime" + i)[3];
      y_shortBreakValues.push(efficiencyNumber);
      shortBreakSession += 1;
      if (efficiencyNumber > shortBreakMaxEfficiency) {
        shortBreakMaxEfficiency = efficiencyNumber;
      }
    }
  }

  var x_longBreakValues = [];
  var y_longBreakValues = [];
  longBreakSession = 1;
  longBreakMaxEfficiency = 100;

  for (i = 0; i < longBreak.length; i++) {
    if (longBreak[i] != "") {
      x_longBreakValues.push(longBreakSession);
      efficiencyNumber = storeEfficiency.get("custom3DesireTime" + i)[3];
      y_longBreakValues.push(efficiencyNumber);
      longBreakSession += 1;
      if (efficiencyNumber > longBreakMaxEfficiency) {
        longBreakMaxEfficiency = efficiencyNumber;
      }
    }
  }

  new Chart("pomodoroChart", {
    type: "line",
    data: {
      labels: x_pomodoroValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: y_pomodoroValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Pomodoro efficiency per session (Higher = increase pomodoro, Lower = decrease pomodoro)",
      },
      scales: {
        yAxes: [{ ticks: { min: 0, max: pomodoroMaxEfficiency } }],
      },
    },
  });

  new Chart("shortBreakChart", {
    type: "line",
    data: {
      labels: x_shortBreakValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: y_shortBreakValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Short Break efficiency per session (Higher = more rest. Lower = less rest)",
      },
      scales: {
        yAxes: [{ ticks: { min: 0, max: shortBreakMaxEfficiency } }],
      },
    },
  });

  new Chart("longBreakChart", {
    type: "line",
    data: {
      labels: x_longBreakValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: y_longBreakValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Long Break efficiency per session (Higher = more rest. Lower = less rest)",
      },
      scales: {
        yAxes: [{ ticks: { min: 0, max: longBreakMaxEfficiency } }],
      },
    },
  });

  var pomodoroSeconds = 0;
  var pomodoroPauseSeconds = 0;
  var shortBreakSeconds = 0;
  var shortBreakPauseSeconds = 0;
  var longBreakSeconds = 0;
  var longBreakPauseSeconds = 0;

  for (i = 0; i < pomodoro.length; i++) {
    if (pomodoro[i] != "") {
      pomodoroSeconds += formatToSeconds(pomodoro[i]);
    }
  }
  for (i = 0; i < pomodoroPause.length; i++) {
    if (pomodoroPause[i] != "") {
      pomodoroPauseSeconds += formatToSeconds(pomodoroPause[i]);
    }
  }
  for (i = 0; i < shortBreak.length; i++) {
    if (shortBreak[i] != "") {
      shortBreakSeconds += formatToSeconds(shortBreak[i]);
    }
  }
  for (i = 0; i < shortBreakPause.length; i++) {
    if (shortBreakPause[i] != "") {
      shortBreakPauseSeconds += formatToSeconds(shortBreakPause[i]);
    }
  }
  for (i = 0; i < longBreak.length; i++) {
    if (longBreak[i] != "") {
      longBreakSeconds += formatToSeconds(longBreak[i]);
    }
  }
  for (i = 0; i < longBreakPause.length; i++) {
    if (longBreakPause[i] != "") {
      longBreakPauseSeconds += formatToSeconds(longBreakPause[i]);
    }
  }
  secondsToFormat(pomodoroSeconds);
  secondsToFormat(pomodoroPauseSeconds);
  secondsToFormat(shortBreakSeconds);
  secondsToFormat(shortBreakPauseSeconds);
  secondsToFormat(longBreakSeconds);
  secondsToFormat(longBreakPauseSeconds);

  pomodoroMinutes = Math.round(pomodoroSeconds / 60);
  pomodoroPauseMinutes = Math.round(pomodoroPauseSeconds / 60);
  shortBreakMinutes = Math.round(shortBreakSeconds / 60);
  shortBreakPauseMinutes = Math.round(shortBreakPauseSeconds / 60);
  longBreakMinutes = Math.round(longBreakSeconds / 60);
  longBreakPauseMinutes = Math.round(longBreakPauseSeconds / 60);

  var xValues = [
    "Podoromo",
    "Podoromo Pause",
    "Short Break",
    "Short Break Pause",
    "Long Break",
    "Long Break Pause",
  ];
  var yValues = [
    pomodoroMinutes,
    pomodoroPauseMinutes,
    shortBreakMinutes,
    shortBreakPauseMinutes,
    longBreakMinutes,
    longBreakPauseMinutes,
  ];
  var barColors = [
    "#C0392B",
    "#D98880",
    "#3498DB",
    "#85C1E9",
    "#2ECC71",
    "#82E0AA",
  ];

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Your result rounded in minutes",
      },
    },
  });

  //collective seconds data
  for (i = 0; i < pomodoroDateDifference.length; i++) {
    //goes up
    if (pomodoroDateDifference[i] != "") {
      fluctuationDuration += pomodoroDateDifference[i];
    }
    //goes down
    if (shortBreakDateDifference[i] != "") {
      fluctuationDuration -= shortBreakDateDifference[i];
    }
    //goes down
    if (longBreakDateDifference[i] != "") {
      fluctuationDuration -= longBreakDateDifference[i];
    }
    overallDuration.push(Math.round(fluctuationDuration / 60));
  }

  //collective date data
  for (i = 0; i < pomodoroDate.length; i++) {
    if (pomodoroDate[i] != "") {
      overallTimeOfDay.push(pomodoroDate[i].split("~")[1]);
    } else if (shortBreakDate[i] != "") {
      overallTimeOfDay.push(shortBreakDate[i].split("~")[1]);
    } else if (longBreakDate[i] != "") {
      overallTimeOfDay.push(longBreakDate[i].split("~")[1]);
    }
  }
  console.log(fluctuationDuration);
  console.log(overallDuration);
  console.log(overallTimeOfDay);

  new Chart("overallChart", {
    type: "line",
    data: {
      labels: overallTimeOfDay,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: overallDuration,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Duration of minutes by time (Big picture)",
      },
      scales: {
        yAxes: [{ ticks: { min: -400, max: 400 } }],
      },
    },
  });

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
    secondsToFormat(pomodoroSeconds) +
    " paused for : " +
    secondsToFormat(pomodoroPauseSeconds) +
    "<br/>Today's break: " +
    secondsToFormat(shortBreakSeconds) +
    " paused for : " +
    secondsToFormat(shortBreakPauseSeconds) +
    "<br/>Today's long break: " +
    secondsToFormat(longBreakSeconds) +
    " paused for " +
    secondsToFormat(longBreakPauseSeconds);
}

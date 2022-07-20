//Variables for
let currentDay = $("#currentDay");
let scheduleArea = $(".schedule");
let timeBlock = $(".time-block");

//Today's date and current hour
let today = moment().format("dddd, MMMM Do, YYYY");
let currentHour = moment().format("H");

//Array for saved items
let toDoItemsArr = [];

//Color code text areas based on time
function colorCells() {
  timeBlock.each(function () {
    let thisBlock = $(this);
    let thisBlockHour = parseInt(thisBlock.attr("data-hour"));
    if (thisBlockHour == currentHour) {
      thisBlock.addClass("present");
    } else if (thisBlockHour > currentHour) {
      thisBlock.addClass("future");
    } else if (thisBlockHour < currentHour) {
      thisBlock.addClass("past");
    }
  });
}

//Start up
function startUp() {
  timeBlock.each(function () {
    let thisBlock = $(this);
    let thisBlockHour = parseInt(thisBlock.attr("data-hour"));
    let toDoObj = {
      hour: thisBlockHour,
      toDo: "",
    };
    toDoItemsArr.push(toDoObj);
  });
  localStorage.setItem("todo", JSON.stringify(toDoItemsArr));
}

//Render Schedule
function renderSchedule() {
  toDoItemsArr = JSON.parse(localStorage.getItem("todo"));
  for (let i = 0; i < toDoItemsArr.length; i++) {
    let itemHour = toDoItemsArr[i].hour;
    let itemToDo = toDoItemsArr[i].toDo;
    $("[data-hour=" + itemHour + "]")
      .children("textarea")
      .val(itemToDo);
  }
}

//Save input to local storage
function saveInput() {
  let thisBlock = $(this).parent();
  let hourInput = parseInt(thisBlock.attr("data-hour"));
  let toDoInput = thisBlock.children("textarea").val();
  for (let i = 0; i < toDoItemsArr.length; i++) {
    if (hourInput === toDoItemsArr[i].hour) {
      toDoItemsArr[i].toDo = toDoInput;
    }
  }
  localStorage.setItem("todo", JSON.stringify(toDoItemsArr));
  renderSchedule();
}

//On Load
$(document).ready(function () {
  currentDay.text(today);
  colorCells();
  //Check local storage if nothing goto startUp()
  if (!localStorage.getItem("todo")) {
    startUp();
  }
  //If data is in local storage run renderSchedule()
  renderSchedule();
  //Event listener
  scheduleArea.on("click", "button", saveInput);
});

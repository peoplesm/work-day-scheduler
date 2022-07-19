//Variables for
let currentDay = $("#currentDay");
let scheduleArea = $(".schedule");
let timeBlock = $(".time-block");

//Today's date and current hour
let today = moment().format("dddd, MMMM Do, YYYY");
let currentHour = moment().format("H");

//Array for saved items
let toDoItems = [];

//Color code text areas based on time
function colorTimeBlocks() {
  timeBlock.each(function () {
    let thisBlock = $(this);
    let thisBlockHour = parseInt(thisBlock.attr("data-hour"));
    if (thisBlockHour == currentHour) {
      thisBlock.addClass("present").removeClass("past future");
    }
    if (thisBlockHour > currentHour) {
      thisBlock.addClass("future").removeClass("present past");
    }
    if (thisBlockHour < currentHour) {
      thisBlock.addClass("past").removeClass("present future");
    }
  });
}

//Start up
function startSchedule() {
  timeBlock.each(function () {
    let thisBlock = $(this);
    let thisBlockHour = parseInt(thisBlock.attr("data-hour"));
    let toDoObj = {
      toDoHour: thisBlockHour,
      toDo: "",
    };
    toDoItems.push(toDoObj);
  });
  localStorage.setItem("todos", JSON.stringify(toDoItems));
}

//Render Schedule
function renderSchedule() {
  toDoItems = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < toDoItems.length; i++) {
    let objHour = toDoItems[i].toDoHour;
    let objToDo = toDoItems[i].toDo;
    $("[data-hour=" + objHour + "]")
      .children("textarea")
      .val(objToDo);
  }
}

//Save input to local storage
function saveHandler() {
  let thisBlock = $(this).parent();

  let toDoHourInput = parseInt(thisBlock.attr("data-hour"));
  let toDoInput = thisBlock.children("textarea").val();

  for (let i = 0; i < toDoItems.length; i++) {
    if (toDoItems[i].toDoHour === toDoHourInput) {
      toDoItems[i].toDo = toDoInput;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

//On Load
$(document).ready(function () {
  //display current date
  currentDay.text(today);
  colorTimeBlocks();
  //Check local storage if nothing goto startSchedule()
  if (!localStorage.getItem("todos")) {
    startSchedule();
  }
  //If data is in local storage run renderSchedule()
  renderSchedule();
  //Event listener
  scheduleArea.on("click", "button", saveHandler);
});

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

//Save text area input to local storage

//On Load
$(document).ready(function () {
  //display current date
  currentDay.text(today);
  colorTimeBlocks();

  //render schedule from local storage

  //when a todo item save button is clicked, save it
  //   scheduleArea.on("click", "button", saveHandler);
});

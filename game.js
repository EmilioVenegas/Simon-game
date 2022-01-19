// _______________________ARRAYS_AND_VARIABLES__________________
// .
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;
// _______________________EFFECTS________________________________
// .
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// ________________________START GAME____________________________
// .
$(document).keydown(function () {
  if (gameStart === false) {
    nextSequence();
    gameStart = true;
  }
});
$(document).dblclick(function () {
  if (gameStart === false) {
    nextSequence();
    gameStart = true;
  }
});
// _______________________START LEVEL_________________________
// .
function nextSequence() {
  ++level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  userClickedPattern = [];

  $("h1").text("Level " + level);
}
// _________________________REGISTER_ANSWERS_________________________
// .
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

// ____________________________CHECK_ANSWERS_____________________________
// .
function checkAnswer() {
  var lastTry = userClickedPattern[userClickedPattern.length - 1];
  var lastAnswer = gamePattern[userClickedPattern.length - 1];
  if (lastAnswer === lastTry) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key or Double Click to Restart");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];
}

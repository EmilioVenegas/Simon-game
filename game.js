// _______________________ARRAYS_AND_VARIABLES__________________
// .
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;
var highScore = [];

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
$("#level-title").click(function () {
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

  $("#level-title").text("Level " + level);
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
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html(
      "Game Over, Press Any Key or <em>Click here</em> to Restart"
    );
    startOver();
  }
}
function startOver() {
  highScore.push(level);

  var lastScore = level;
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];
  highestScore(lastScore);
}
// _____________________HIGHEST SCORE_____________________
function highestScore(lastScore) {
  $(".highscore").text("Highest Score: " + Math.max(...highScore));
  $(".lastscore").text("Last Score: " + lastScore);
}

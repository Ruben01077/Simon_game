let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
var started = false;


$(".btn").click(function (e) { 

  let userChosenColour = e.target.id
  userClickedPattern.push(userChosenColour)
  console.log(userClickedPattern)
  let index_of_the_last_answer = userClickedPattern.length-1
  checkAnswer(index_of_the_last_answer)
  playSound(userChosenColour)
  animatePress(userChosenColour)

});


function nextSequence(){
    userClickedPattern = [];
    level++
    $("#level-title").text("Մակարդակ " + level);
    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    let selectedBox =  $("#" + randomChosenColour)
    selectedBox.fadeOut(150).fadeIn(150);
    playSound(randomChosenColour)

    console.log(gamePattern)
    console.log(userClickedPattern)

}

function playSound(name){

    let audio = new Audio("sounds/" + name + ".mp3").play()

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        
        $("#" + currentColour).removeClass("pressed");

    }, 100);

}


$(document).click(function (e) { 

    if (!started) {
    setTimeout(function() {
        
        $("#level-title").text("Մակարդակ " + level);
        nextSequence();
        started = true;

    }, 400);

    }
    
    
});

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
      } } else {
  
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Խաղն ավարտված է, վայ Թենի Թենի 😂 ուտեմ մռութտ😍: Սեղմեք ազատ դաշտի վրա խաղը վերսկսելու համար ")
        setTimeout(() => {
            startOver()
            
        }, 2000);
  
      }

}


function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }

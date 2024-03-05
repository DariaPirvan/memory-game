var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var numberOfLevel = 0;
var WrongAnswerSound = "wrong";
var start = true; //pt ca atunci cand suntem in timpul jocului, sa nu mai poti apasa din nou tasta r pt a incepe jocul din nou


$(document).on("keydown", function(event){
    if(event.key.toLowerCase() === "x" && start === true){ 
    start = false;
    $("h1").text("Level " + numberOfLevel);
    nextSequence();
    }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id"); //stocheaza id ul butonului apasat de utilizator
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateClick(userChosenColor);
    checkAnswer(userClickPattern.length - 1); // usserClickPattern.length - 1 va da indexul ultimului element din array ul userClickPattern, adica ultima culoare apasata de utilizator
});



function nextSequence(){
    var randomNumber = (Math.floor(Math.random()*4)); //un numar random intre 0-3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); //cu push adaugi elemente noi in array(la finalul array ului)

    var buttonToAnimate = $("#" + randomChosenColour);
   
    buttonToAnimate.fadeIn(100).fadeOut(100).fadeIn(100);//light effect pentru butonul de are id ul culorii randomChosenColour
    playSound(randomChosenColour);
    numberOfLevel++;
    $("h1").text("Level " + numberOfLevel);

} 

function checkAnswer(currentLevel) {
     if (userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if( userClickPattern.length === gamePattern.length){ // daca ultimul raspuns a fost corect, verific daca s a terminat runda(Sequence)
    setTimeout(function() {            
        nextSequence();
    }, 1000);
    userClickPattern = [];
}
}
     else{

    playSound(WrongAnswerSound);
    $("h1").html("GAME OVER! Press X to restart the game");
    $("body").addClass("game-over");
    setTimeout(function() {            
    $("body").removeClass("game-over");
    }, 100); //0.1 sec
    restartGame();
    }
        
}

function restartGame(){
    gamePattern = [];
    start = true;  //schimb start in true ca sa se verifice iar prima conditie de start! de la inceputul codului
    numberOfLevel = 0;
}

    function animateClick(currentColour){
        
        var activeButton = $("#" + currentColour)
        activeButton.addClass("pressed");
    setTimeout(function() {            
        activeButton.removeClass("pressed");
    }, 100); //0.1 sec
    }

    function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    

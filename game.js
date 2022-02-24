var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    setTimeout(function(){
        $("."+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        audioname="sounds/" + randomChosenColor + ".mp3";
        playsound(audioname);
    },300);
    level++;
    $("h1").text("Level "+level);
}

var userClickedPattern=[];
$(".btn").click(function(){
    var userChosenColour=this.id;
    audioname="sounds/" + userChosenColour + ".mp3";
    playsound(audioname)
    animatedPress(userChosenColour);
    userClickedPattern.push(userChosenColour);
});

function playsound(filename){
    var audio=new Audio(filename);
    audio.play()
}

function animatedPress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function()
        {$("."+currentColor).removeClass("pressed")}, 100);
}

var check_point=0;
var press=false;
$(document).keypress(function(){
        if(!press){
        $('h1').text("Level 0");
        nextSequence();
        press=true;
        console.log(press);
        }
    })
    
    $(".btn").click(function(){
        var userChosenColour=this.id;
        audioname="sounds/" + userChosenColour + ".mp3";
        playsound(audioname);
        animatedPress(userChosenColour);
        if(userChosenColour===gamePattern[check_point]){
            check_point+=1;
            if(check_point===gamePattern.length){
                nextSequence();
                check_point=0
            }
        }else{
            playsound("sounds/wrong.mp3");
            $('body').addClass("game-over");
            $("h1").text("Game Over");
            level=0;
            gamePattern=[];
            press=false;
            check_point=0;
            setTimeout(function(){
                $('h1').text("Press A Key to Start");
                $('body').removeClass("game-over");
            },500);
        }
    });








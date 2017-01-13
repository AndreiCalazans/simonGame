'use strict'
var sounds = {
   sound0 : new Audio,
   sound1 : new Audio,
   sound2 : new Audio,
   sound3 : new Audio
}

sounds.sound0.src = 'simonSound1.mp3';
sounds.sound1.src = 'simonSound2.mp3';
sounds.sound2.src = 'simonSound3.mp3';
sounds.sound3.src = 'simonSound4.mp3';
var error = new Audio;
error.src = "error.mp3";
var game = true;
var circles = document.getElementsByClassName("circle");
var user = true;
var array = [];
var userSelected = [];
var strictMode = false;
var speed = 500;
var msg = document.querySelector(".msg");
var userIsSuccess = true;
var entryUI = document.getElementById("entry");
var counter = document.getElementById("counter");
var strictModeToggle = document.getElementById("strictMode");

//functions
////////////////////////////////////
///to do
/// keep score of highest
// if win create a celebration animation
/// speed increaser
// put rules

var arrow = document.querySelector(".arrow");
arrow.addEventListener("click", function(){
 gameOver();
 // entryUI.style.display = "flex";
 $("#entry").toggle("slow");
})

function arrayCreator(){
  if(userIsSuccess){
    var number = Math.floor(Math.random() * 4 )
    array.push(number);
  }
};


///////////////////
function iterator(){

  for (var i = 0 ; i < array.length ; i++){
     lightSequence(i);
  }
};
////////////////////////
function lightSequence(i){

  setTimeout( function(){  lightUp(array[i]); }, speed*i);
  setTimeout(function(){ msg.innerHTML="your turn"; user =true; }, array.length * speed);
};
//////////////////////////
function lightUp(index){
  circles[index].style.background = circles[index].id;
  circles[index].style.boxShadow = "0 0 20px 3px rgba(255, 255, 255, 0.5)" ;
  sounds["sound"+index].currentTime = 0;
  sounds["sound"+index].play();
  setTimeout(function(){circles[index].style.background = "none"; circles[index].style.boxShadow = "none"; }, 200);
};


///////////////////////////////
function doesItMatch(a , b ){
    for(var i = 0 ; i < a.length ; i++){
      if(a[i] != b[i]){
        return   false;
        break;
      }
    }
    userIsSuccess = true;
    return true;
};
///////////////////////////////
function userClick(){

 if(!user){
   userSelected = [];
   return;
 }
 if(userSelected.length == array.length){
   error.currentTime = 0;
    error.play();
    return;
  }
     lightUp(this.dataset.num);
     userSelected.push(this.dataset.num);
     counter.innerHTML = userSelected.length;

     ////////////test////////////
       if(checkStatus()){
         if(userSelected.length == array.length){
           user = false;
            setTimeout( gamePlaying,speed*2);
         };
       }else {
         gameOver();
       }

};
////////////////////////


function userTurn(){

  for(var i = 0 ; i < circles.length ; i++){
    circles[i].addEventListener('click', userClick); //end of listener
  }

};

/////////////////////////
function gameOver(){
  game = false;
  user = false;
  alertLights();
  error.play();
  setTimeout(alertLights,600);   // this is to remove the alert class
  msg.innerHTML = '<div>You Lose!</div><div id="lost"><i onclick="gameStart(\'restart\')" class="fa fa-repeat" aria-hidden="true"></i><p>Play again</p></div>';
  array = [];
  userSelected = [];
  return ;
};
///////////////////////

function repeat(){
  userSelected = [];
  iterator();
  user = true;

};


///////////////////////////

function gameStart(a){
  if(strictModeToggle.checked == true){
    strictMode = true;
  }else {
    strictMode = false;
  }
  game =true;
 // entryUI.style.display = "none";
 if(a != "restart"){
    $("#entry").toggle("slow");
 };

  //////create intro////
 counter.innerHTML = userSelected.length; //update
msg.innerHTML ="Simon's turn";

  ///gameplay////
  for(var i = 0 ; i < circles.length ; i++){
      circles[i].removeEventListener("click" , userTurn);
  };
  setTimeout(gamePlaying , 1000);
  userTurn();

};

function alertLights(){
  // instead of doing this replace for the animating css
      for(var i = 0 ; i < 4 ; i++){
        circles[i].classList.toggle("alert");
      }

};


////////////////////////////////
function gamePlaying() {

    msg.innerHTML="Simon's turn";
    user= false;
    arrayCreator();
    iterator();

    userSelected = [];
  };

  //////////////////
//true to continue
  function checkStatus(){
    if(strictMode){
      if(!doesItMatch(userSelected,array)){
      return false;
    }else{
      msg.innerHTML = "Horay!";
      if(userSelected.length === array.length){
        msg.innerHTML = "You did it!";
      }
      return true;
    }
  }
    if(doesItMatch(userSelected,array)){
      msg.innerHTML = "Horay!";
        if(userSelected.length === array.length){
          msg.innerHTML = "You did it!";
        }
      return true;
    }else {
      alertLights();
      error.play();
      setTimeout(alertLights,600);
      msg.innerHTML = "Try one more time";
      user=false;
      userIsSuccess = false;
      setTimeout(repeat, 1000);
      return true;
    }
  };

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

//functions
////////////////////////////////////
/// makes random number to push to the array to make the simon says
///to do
//// increase communication example start , your turn, simons turn etc..
/// speed increaser
// put rules
// add switch for strict mode

var arrow = document.querySelector(".arrow");
arrow.addEventListener("click", function(){
 gameOver();
 entryUI.style.display = "flex";
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
  setTimeout(function(){ user =true; }, array.length * speed);
};
//////////////////////////
function lightUp(index){
  circles[index].style.background = circles[index].id;
  sounds["sound"+index].currentTime = 0;
  sounds["sound"+index].play();
  setTimeout(function(){circles[index].style.background = "none";}, 200);
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
     if(userSelected.length == array.length){
       if(checkStatus()){

         setTimeout( gamePlaying,speed*2);
       }else {
         gameOver();
       }
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
  msg.innerHTML = '<div>You Lose!</div><div id="lost"><i onclick="gameStart()" class="fa fa-repeat" aria-hidden="true"></i><p>Play again</p></div>';
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

function gameStart(){
  game =true;
 entryUI.style.display = "none";
  //////create intro////
 counter.innerHTML = userSelected.length; //update
msg.innerHTML ="Attention now";

  ///gameplay////
  for(var i = 0 ; i < circles.length ; i++){
      circles[i].removeEventListener("click" , userTurn);
  };

  gamePlaying();
  userTurn();

};



////////////////////////////////
function gamePlaying() {

    msg.innerHTML="Attention";
    user= false;
    arrayCreator();
    iterator();

    userSelected = [];
  };

  //////////////////
//true to continue
  function checkStatus(){
    if(strictMode){
      if(!doesItMatch(array , userSelected)){
      return false;
    }else{
      return true;
    }
  }
    if(doesItMatch(array , userSelected)){
      msg.innerHTML = "Horay!";
      return true;
    }else {
      console.log("wrong");
      msg.innerHTML = "Try one more time";
      user=true;
      userIsSuccess = false;
      return true;
    }
  };

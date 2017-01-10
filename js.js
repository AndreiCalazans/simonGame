'use strict'
var sounds = {
   sound0 : new Audio,
   sound1 : new Audio,
   sound2 : new Audio,
   sound3 : new Audio
}
// var sound1 = new Audio;
// var sound2 = new Audio;
// var sound3 = new Audio;
// var sound4 = new Audio;
sounds.sound0.src = 'simonSound1.mp3';
sounds.sound1.src = 'simonSound2.mp3';
sounds.sound2.src = 'simonSound3.mp3';
sounds.sound3.src = 'simonSound4.mp3';
var game = true;
var circles = document.getElementsByClassName("circle");
var user = true;
var array = [];
var userSelected = [];
var strictMode = false;
var speed = 'normal';
var msg = document.querySelector(".msg");
var userIsSuccess = true;
var entryUI = document.querySelector(".entry");
//functions
////////////////////////////////////
/// makes random number to push to the array to make the simon says
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
  setTimeout( function(){  lightUp(array[i]); }, 500*i);
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

     lightUp(this.dataset.num);
     userSelected.push(this.dataset.num);
     console.log(userSelected);

     ////////////test////////////
     if(userSelected.length == array.length){
       if(checkStatus()){
         setTimeout( gamePlaying,1000);
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
  msg.innerHTML = `<div>You Lose!</div>
  <div id="lost"><i onclick='gameStart()' class="fa fa-repeat" aria-hidden="true"></i><p>Play again</p></div>`;
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
  //////create intro////
 entryUI.style.display = "none";
 msg.innerHTML = "focus man!!!"

  ///gameplay////
  for(var i = 0 ; i < circles.length ; i++){
      circles[i].removeEventListener("click" , userTurn);
  };

  gamePlaying();
  userTurn();

};



////////////////////////////////
function gamePlaying() {
    user= false;
    arrayCreator();
    iterator();
    console.log(array);
    user = true;
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
      msg.innerHTML = "horay keep going";
      return true;
    }else {
      msg.innerHTML = "Try one more time";
      user=true;
      userIsSuccess = false;
      return true;
    }
  };

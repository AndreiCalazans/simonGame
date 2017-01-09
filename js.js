'use strict'

var sound1 = new Audio;
var sound2 = new Audio;
var sound3 = new Audio;
var sound4 = new Audio;
sound1.src = 'simonSound1.mp3';
sound2.src = 'simonSound2.mp3';
sound3.src = 'simonSound3.mp3';
sound4.src = 'simonSound4.mp3';
var game = true;
var circles = document.getElementsByClassName("circle");

var array = [];

////////////////////////////////////
/// makes random number to push to the array to make the simon says
function arrayCreator(){
  var number = Math.floor(Math.random() * 4 )
  array.push(number);
}


///////////////////
function iterator(){
  for (var i = 0 ; i < array.length ; i++){
     lightSequence(i);
  }
};
////////////////////////
function lightSequence(i){
  setTimeout( function(){  lightUp(array[i]); }, 500*i);
}
//////////////////////////
function lightUp(index){
  circles[index].style.background = circles[index].id;
  setTimeout(function(){circles[index].style.background = "none";}, 200);
}
///////////////////////////////

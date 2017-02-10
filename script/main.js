/**
 * Main scripts - Import JS modules here:
 */

import {getRandomNumber, cloneArray} from './helper';
//var helper  = require('./helper');
import gameBoard from './gameBoard';


const gridTemplate = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
];
const ships = [4, 5, 4];
const InputField = document.getElementById('fireOnGrid');
const pointsToWin = gameBoard.pointsToWin(ships);

window.onload = startGame;


function checkShotFired (resetCallback) {
  var corrdinatesOfAttack = document.getElementById('fireOnGrid').value.toUpperCase().split('');
  
  if (gameBoard.isValidRequest(corrdinatesOfAttack)) {
    gameBoard.assessDamage(corrdinatesOfAttack)
  }
  
  if(gameBoard.score == pointsToWin) {
    alert('We have beaten the rotten armada. The game will reset.');
    startGame();
  }
}

function startGame() {

  var fire = document.getElementById("fire");
  fire.addEventListener('click', checkShotFired);

  // place the ships on the game board
  gameBoard.buildGrid(cloneArray(gridTemplate), ships);
}

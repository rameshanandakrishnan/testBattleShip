(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./helper');

var gameBoard = {

  rows: {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
    'I': 9,
    'J': 10
  },

  columns: 10,

  score: 0,

  gridModel: [],

  pointsToWin: function pointsToWin(ships) {
    return ships.reduce(function (previous, current) {
      return previous + current;
    });
  },
  buildGrid: function buildGrid(template, ships) {
    var _this = this;

    document.getElementById('battleField').innerHTML = '';

    this.gridModel = template;

    Object.keys(this.rows).forEach(function (item, index) {
      var row = _this.injectElement('row', item);
      document.getElementById("battleField").appendChild(row);

      for (var x = 0; x < _this.columns; x++) {
        row.appendChild(_this.injectElement('column', item + x));
      }
    });

    this.score = 0;
    this.deployShips(ships);
  },
  injectElement: function injectElement(className, elementId) {
    var element = document.createElement('div');
    element.classList += className;
    element.id = elementId;

    if (className === 'column') {
      element.setAttribute('data-grid', elementId);
    }

    return element;
  },
  deployShips: function deployShips(ships) {
    var that = this;

    ships.forEach(function (shipLength) {
      var positionOfShip,
          shipArray = [];

      // randomFunction returns 1 or 0
      // if 1 rotate array
      if ((0, _helper.getRandomNumber)(0, 1) === 1) {
        that.gridModel = (0, _helper.rotateArray)(that.gridModel);
      }

      positionOfShip = that.returnNonOverlappingPosition(shipLength);

      for (var i = 0; i < shipLength; i++) {
        shipArray.push(1);
      }

      Array.prototype.splice.apply(that.gridModel[positionOfShip.rowOfInterest], [positionOfShip.startOfShip, shipLength].concat(shipArray));
    });
  },
  returnNonOverlappingPosition: function returnNonOverlappingPosition(shipLength) {
    var rowToInject = (0, _helper.getRandomNumber)(0, 9);
    var startOfShip = (0, _helper.getRandomNumber)(0, 9 - shipLength);
    var cloneOfRow = JSON.parse(JSON.stringify(this.gridModel[rowToInject]));

    var selectedArray = cloneOfRow.splice(startOfShip, startOfShip + shipLength + 1); //+1 to second parameter if you dont want boats touching?

    if (selectedArray.indexOf(1) > -1) {
      this.returnNonOverlappingPosition(shipLength); //call recursive function to find a new posiiton
    }

    return {
      rowOfInterest: rowToInject,
      startOfShip: startOfShip
    }; //Successfully Inject ship
  },
  assessDamage: function assessDamage(corrdinatesOfAttack) {
    var cell = document.getElementById(corrdinatesOfAttack.join('')),
        rowValue = this.rows[corrdinatesOfAttack[0]],
        stirkeValue = this.gridModel[rowValue - 1][corrdinatesOfAttack[1]];

    //this could be removed into message manager
    if (stirkeValue === 1) {
      cell.classList += ' hit';
      this.score++;
      console.log('Hit');
    } else if (stirkeValue === 0) {
      cell.classList += ' miss';
      console.log('Miss');
    } else {
      console.log('We have already hit that target.');
    }

    this.gridModel[rowValue - 1][corrdinatesOfAttack[1]] = 2;
  },
  isValidRequest: function isValidRequest(corrdinatesOfAttack) {
    if (!this.rows[corrdinatesOfAttack[0]] && !(corrdinatesOfAttack[0] > 0 && corrdinatesOfAttack[0] < 10)) {
      console.log('enter a valid cordinate, captain!');
      return false;
    }
    return true;
  }
};

exports.default = gameBoard;

},{"./helper":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRandomNumber = getRandomNumber;
exports.rotateArray = rotateArray;
exports.cloneArray = cloneArray;
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotateArray(currentArray) {
	return currentArray[0].map(function (col, i) {
		return currentArray.map(function (row) {
			return row[i];
		});
	});
}

function cloneArray(currentArray) {
	return JSON.parse(JSON.stringify(currentArray));
}

},{}],3:[function(require,module,exports){
'use strict';

var _helper = require('./helper');

var _gameBoard = require('./gameBoard');

var _gameBoard2 = _interopRequireDefault(_gameBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main scripts - Import JS modules here:
 */

var gridTemplate = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var ships = [4, 5, 4];
var InputField = document.getElementById('fireOnGrid');
var pointsToWin = _gameBoard2.default.pointsToWin(ships);

window.onload = startGame;

function checkShotFired(resetCallback) {
  var corrdinatesOfAttack = document.getElementById('fireOnGrid').value.toUpperCase().split('');

  if (_gameBoard2.default.isValidRequest(corrdinatesOfAttack)) {
    _gameBoard2.default.assessDamage(corrdinatesOfAttack);
  }

  if (_gameBoard2.default.score == pointsToWin) {
    alert('We have beaten the rotten armada. The game will reset.');
    startGame();
  }
}

function startGame() {

  var fire = document.getElementById("fire");
  fire.addEventListener('click', checkShotFired);

  // place the ships on the game board
  _gameBoard2.default.buildGrid((0, _helper.cloneArray)(gridTemplate), ships);
}

},{"./gameBoard":1,"./helper":2}]},{},[3]);

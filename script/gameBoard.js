import * as helper from "./helper";

var gameBoard = {

  rows : {
    'A' : 1, 
    'B' : 2, 
    'C' : 3, 
    'D' : 4,  
    'E' : 5,  
    'F' : 6,  
    'G' : 7,  
    'H' : 8,  
    'I' : 9,  
    'J' : 10
  },

  columns : 10,

  score : 0,

  gridModel : [],

  pointsToWin(ships) {
    return ships.reduce(function(previous, current){ return previous + current});
  },

  buildGrid(template, ships) {
    document.getElementById('battleField').innerHTML = '';

    this.gridModel = template;

    Object.keys(this.rows).forEach((item, index) => {
      var row = this.injectElement('row', item)
      document.getElementById("battleField").appendChild(row);

      for ( var x = 0; x < this.columns; x++){
        row.appendChild(this.injectElement('column', item + x));
      }
    });

    this.score = 0;
    this.deployShips(ships);
  },

  injectElement(className, elementId ) {
    var element = document.createElement('div');
    element.classList += className;
    element.id = elementId;

    if(className === 'column') {
      element.setAttribute('data-grid', elementId)
    }

    return element;
  },

  deployShips(ships) {
    var that = this;

    ships.forEach(function(shipLength){
      var positionOfShip,
        shipArray = [];

      // randomFunction returns 1 or 0
      // if 1 rotate array
      if(helper.getRandomNumber(0,1) === 1){
        that.gridModel = helper.rotateArray(that.gridModel);
      }

      positionOfShip = that.returnNonOverlappingPosition(shipLength);

      for(var i=0; i < shipLength; i++) {
        shipArray.push(1)
      }
      
      Array.prototype.splice.apply(that.gridModel[positionOfShip.rowOfInterest], [positionOfShip.startOfShip, shipLength].concat(shipArray));
    }) 
  },

  returnNonOverlappingPosition(shipLength) {
    var rowToInject = helper.getRandomNumber(0, 9);
    var startOfShip = helper.getRandomNumber(0, 9-shipLength);
    var cloneOfRow = JSON.parse(JSON.stringify(this.gridModel[rowToInject]));

    var selectedArray = cloneOfRow.splice(startOfShip, (startOfShip+shipLength+1));

    if( selectedArray.indexOf(1) > -1 ){
      this.returnNonOverlappingPosition(shipLength)//call recursive function to find a new posiiton
    }

    return {
      rowOfInterest : rowToInject,
      startOfShip: startOfShip
    }; //Successfully Inject ship
  },

  assessDamage(corrdinatesOfAttack) {
    let cell = document.getElementById(corrdinatesOfAttack.join('')), 
        rowValue = this.rows[(corrdinatesOfAttack[0])],
        stirkeValue = this.gridModel[rowValue-1][(corrdinatesOfAttack[1])];

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

    this.gridModel[rowValue-1][(corrdinatesOfAttack[1])] = 2;
  },

  isValidRequest(corrdinatesOfAttack) {
    if (!this.rows[corrdinatesOfAttack[0]] && !(parseInt(corrdinatesOfAttack[1]) > 0 && parseInt(corrdinatesOfAttack[1]) < 10) ) {
      console.log('enter a valid cordinate, captain!');
      return false;
    }
    return true;
  }
}

export default gameBoard;

import gameBoard from '../script/gameBoard';
import * as helper from "../script/helper";
 
describe('GameBoard meathods ', function() {
  var boardElement;

  beforeAll(function() {
    boardElement = document.createElement('div')
    boardElement.id = 'battleField';

    document.body.appendChild(boardElement);
  });

  it('it should calculate the total points to win', function() {
    expect(gameBoard.pointsToWin([1,3])).toEqual(4)
  });

  describe('logic relates to building the board', function() {

    var grid = [
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
      [0,0,0,0,0,0,0,0,0,0]
    ];

    afterEach(function() {
      document.getElementById('battleField').innerHTML = '';
    });

    it('should build a 10 by 10 grid', function() {
      gameBoard.buildGrid(grid, []);
      expect(document.querySelectorAll('.column').length).toEqual(100)
    });

    it('it should update the grid with 1s where the ships were placed', function() {
      gameBoard.buildGrid(grid, [3,5]);
      let totalDeploymentValue = gameBoard.gridModel.map(function(row){
        return row.reduce(function(x,y){return x + y})
      }).reduce(function(x,y){return x + y;});

      expect(totalDeploymentValue).toEqual(8);
    });

    describe('returnNonOverlappingPosition', function() {
      let grid = [
        [1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
      ];

      it('should recursivly call returnNonOverlappingPosition if the current position is not valid', function () {
        spyOn(helper, 'getRandomNumber').and.returnValue(1);
        let injectCorrdinates = gameBoard.returnNonOverlappingPosition(4);

        expect(injectCorrdinates).toEqual({rowOfInterest:1, startOfShip:1});
      });
    });

    describe('Assess Damage', function() {

      beforeEach(function() {
        spyOn(console, 'log').and.callThrough();

        grid = [
          [1,1,1,1,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0]
        ];

        gameBoard.buildGrid(grid, []);
      });

      afterEach(function() {
        document.getElementById('battleField').innerHTML = '';
      });

      it('it should return message of success if the user hits a target', function() {

        gameBoard.assessDamage(['A','1']);

        expect(console.log).toHaveBeenCalledWith('Hit');
      });

      it('it should increase the score by a score of 1', function() {

        gameBoard.assessDamage(['A','1']);

        expect(gameBoard.score).toEqual(1);

        gameBoard.assessDamage(['A','2']);

        expect(gameBoard.score).toEqual(2);

        gameBoard.assessDamage(['B','3']);

        expect(gameBoard.score).toEqual(2);
      });

      it('it should return unsuccesful message if the user misses the target', function() {

        gameBoard.assessDamage(['C','1']);

        expect(console.log).toHaveBeenCalledWith('Miss');
      });

      it('it should prompt the user that they have hit the target if it is already marked as attacked', function() {

        gameBoard.assessDamage(['C','3']);

        expect(console.log).toHaveBeenCalledWith('Miss');

        gameBoard.assessDamage(['C','3']);

        expect(console.log).toHaveBeenCalledWith('We have already hit that target.');
      });
    });

    describe('isValidRequest', function() {
      it('should return false if an invalid corrdinates are entered', function() {
        expect(gameBoard.isValidRequest('z', '1')).toEqual(false);
        expect(gameBoard.isValidRequest('a', 'u')).toEqual(false);
        expect(gameBoard.isValidRequest('2', '1')).toEqual(false);
      });

      it('should return true if a valid corrdinates are entered', function() {
        expect(gameBoard.isValidRequest('B', '1')).toEqual(true);
        expect(gameBoard.isValidRequest('A', '2')).toEqual(true);
        expect(gameBoard.isValidRequest('D', '9')).toEqual(true);
      });
    });
  });
});

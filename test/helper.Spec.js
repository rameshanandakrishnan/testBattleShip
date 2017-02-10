import * as module from '../script/helper';

describe('cloneArray(): ', function() {
  it('it can create a new array with a new reference', function() {
    let oldArray = [[1,2], [3,4]];
    let newArray = module.cloneArray(oldArray);
    expect(oldArray).not.toBe(newArray);
    expect(oldArray).toEqual(newArray);
  });
});

describe('rotateArray(): ', function() {
  it('it can create a new array with a new reference', function() {
    let oldArray = [[1,2], [3,4]];
    let newArray = module.rotateArray(oldArray);
    expect(newArray[0]).toEqual([1,3]);
    expect(newArray[1]).toEqual([2,4]);
  });
});

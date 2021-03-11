const { expect } = require('chai');

const groupArrayElements = require('../lib/group-array-elements');

describe('Testing groupArrayElements', () => {
  describe('Testing arguments validation', () => {
    it('Empty array argument should throw "First argument is not an array"', () => {
      const expectedErrorMessage = 'First argument is not an array';
      expect(() => groupArrayElements()).to.throw(expectedErrorMessage);
    });

    it('Empty or invalid partCount argument should throw "Second argument is not an integer"', () => {
      const expectedErrorMessage = 'Second argument is not an integer';
      // empty
      expect(() => groupArrayElements([])).to.throw(expectedErrorMessage);
      // null
      expect(() => groupArrayElements([], null)).to.throw(expectedErrorMessage);
      // string
      expect(() => groupArrayElements([], 'string')).to.throw(expectedErrorMessage);
      // object
      expect(() => groupArrayElements([], {})).to.throw(expectedErrorMessage);
      // array
      expect(() => groupArrayElements([], [])).to.throw(expectedErrorMessage);
      // float
      expect(() => groupArrayElements([], 1.2)).to.throw(expectedErrorMessage);
    });
  })

  describe('Testing functionality', () => {
    it('Empty array argument returns an empty array', () => {
      expect(groupArrayElements([], 123)).to.deep.equal([]);
    });

    it('partCount argument equal 0 returns an empty array', () => {
      expect(groupArrayElements([1, 2, 3], 0)).to.deep.equal([]);
    });

    it('Dividing an array by more times than it size gives an an array of that original size', () => {
      expect(groupArrayElements([1, 2, 3], 10000)).to.deep.equal([[1], [2], [3]]);
    });

    it('Dividing an array of size multiple times of partCount will give a number of equal groups', () => {
      expect(groupArrayElements([1, 2, 3, 4, 5, 6], 2)).to.deep.equal([[1, 2, 3], [4, 5, 6]]);
      expect(groupArrayElements([1, 2, 3, 4, 5, 6], 3)).to.deep.equal([[1, 2], [3, 4], [5, 6]]);
      expect(groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8], 4)).to.deep.equal([[1, 2], [3, 4], [5, 6], [7, 8]]);
    });

    it('Dividing an array of size multiple times of partCount will give a number of equal groups plus a group with a lower size (rest)', () => {
      expect(groupArrayElements([1, 2, 3, 4, undefined, 6, 7, 8, 9], 4)).to.deep.equal([[1, 2], [3, 4], [undefined, 6], [7, 8], [9]]);
      expect(groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, []], 2)).to.deep.equal([[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, []]]);
    });
  });
});

import { Coord, getMajorDiagonalLength, getMajorDiagonalStart, getMinorDiagonalLength, getMinorDiagonalStart } from './utils';

describe(`utils`, () => {

  describe(`getMajorDiagonalStart`, () => {

    it(`gets diagonal start on left column`, () => {
      const actual = getMajorDiagonalStart({ i: 4, j: 2 });
      const expected: Coord = { i: 2, j: 0 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start on top row`, () => {
      const actual = getMajorDiagonalStart({ i: 2, j: 3 });
      const expected: Coord = { i: 0, j: 1 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start at origin`, () => {
      const actual = getMajorDiagonalStart({ i: 5, j: 5 });
      const expected: Coord = { i: 0, j: 0 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start from left column`, () => {
      const actual = getMajorDiagonalStart({ i: 3, j: 0 });
      const expected: Coord = { i: 3, j: 0 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start from top row`, () => {
      const actual = getMajorDiagonalStart({ i: 0, j: 5 });
      const expected: Coord = { i: 0, j: 5 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start from origin`, () => {
      const actual = getMajorDiagonalStart({ i: 0, j: 0 });
      const expected: Coord = { i: 0, j: 0 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

  });

  describe(`getMinorDiagonalStart`, () => {

    it(`gets diagonal start on right column`, () => {
      const actual = getMinorDiagonalStart({ i: 4, j: 2 }, 6);
      const expected: Coord = { i: 1, j: 5 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start on top row`, () => {
      const actual = getMinorDiagonalStart({ i: 1, j: 2 }, 6);
      const expected: Coord = { i: 0, j: 3 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start at origin`, () => {
      const actual = getMinorDiagonalStart({ i: 2, j: 3 }, 6);
      const expected: Coord = { i: 0, j: 5 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start from right column`, () => {
      const actual = getMinorDiagonalStart({ i: 3, j: 5 }, 6);
      const expected: Coord = { i: 3, j: 5 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start from top row`, () => {
      const actual = getMinorDiagonalStart({ i: 0, j: 4 }, 6);
      const expected: Coord = { i: 0, j: 4 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

    it(`gets diagonal start from origin`, () => {
      const actual = getMinorDiagonalStart({ i: 0, j: 5 }, 6);
      const expected: Coord = { i: 0, j: 5 };
      expect(actual.i).toBeCloseTo(expected.i);
      expect(actual.j).toBeCloseTo(expected.j);
    });

  });

  describe(`getMajorDiagonalLength`, () => {

    it(`gets diagonal length for origin`, () => {
      expect(getMajorDiagonalLength({ i: 0, j: 0 }, 6, 5)).toBe(5);
    });

    it(`gets diagonal length for bottom-left corner`, () => {
      expect(getMajorDiagonalLength({ i: 4, j: 0 }, 6, 5)).toBe(1);
    });

    it(`gets diagonal length for a middle starting point`, () => {
      expect(getMajorDiagonalLength({ i: 2, j: 0 }, 6, 5)).toBe(3);
    });

  });

  describe(`getMinorDiagonalLength`, () => {

    it(`gets diagonal length for origin`, () => {
      expect(getMinorDiagonalLength({ i: 0, j: 4 }, 5, 4)).toBe(4);
    });

    it(`gets diagonal length for bottom-right corner`, () => {
      expect(getMinorDiagonalLength({ i: 2, j: 4 }, 5, 4)).toBe(2);
    });

    it(`gets diagonal length for a middle starting point`, () => {
      expect(getMinorDiagonalLength({ i: 0, j: 2 }, 5, 4)).toBe(3);
    });

  });

});

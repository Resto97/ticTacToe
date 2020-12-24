export interface Coord {
  i: number;
  j: number;
}

export function getMajorDiagonalStart(
  coord: Coord,
): Coord {
  const diff = coord.i - coord.j;
  if (diff > 0) {
    return { i: diff, j: 0 };
  } else {
    return { i: 0, j: -diff };
  }
}

/**
 * @param coord - Must be from leftmost column or top row.
 */
export function getMajorDiagonalLength(
  coord: Coord,
  colsCount: number,
  rowsCount: number,
): number {
  if (coord.j === 0) {
    return rowsCount - coord.i;
  } else {
    return colsCount - coord.j;
  }
}

export function getMinorDiagonalStart(
  coord: Coord,
  colsCount: number,
): Coord {
  const sum = coord.i + coord.j;
  if (sum > colsCount - 1) {
    return { i: sum - (colsCount - 1), j: colsCount - 1 };
  } else {
    return { i: 0, j: sum };
  }
}

// export function getMinorDiagonalLength (
//
// ) {
//
// }



import { Injectable } from '@angular/core';
import { Sign, Matrix } from './table-config';
import { Coord } from '../utils';
import { getNextToLastParentNode } from 'codelyzer/util/utils';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  getWinnerIfThereIsOne(
    matrix: Matrix<Sign>,
    start: Coord,
    deltaI: number,
    deltaJ: number,
    iterationsCount: number,
    consecutiveSigns: number,
  ): string {
    let i = start.i;
    let j = start.j;
    let counterSigns = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let iteration = 0; iteration < iterationsCount; iteration++) {
      const current = matrix[i][j];
      const next = matrix[i + deltaI][j + deltaJ];
      if (current !== '' && next !== '' && current === next) {
        counterSigns++;
        if (counterSigns === consecutiveSigns - 1) {
          return current;
        }
      } else {
        counterSigns = 0;
      }
      i += deltaI;
      j += deltaJ;
    }
    return 'N';
  }
}

// returns X,O or N if there is no winner
/* getWinnerIfThereIs(tableMatrix: string[][], row: number, col: number): string {
  // check row
  for (let i = 0; i < 2; i++) {
    if (tableMatrix[row][i] === '' || tableMatrix[row][i + 1] === '' || tableMatrix[row][i] !== tableMatrix[row][i + 1]) {
      break;
    }
    if (i === 1) {
      return tableMatrix[row][col];
    }
  }
  // check column
  for (let i = 0; i < 2; i++) {
    if (tableMatrix[i][col] === '' || tableMatrix[i + 1][col] === '' || tableMatrix[i][col] !== tableMatrix[i + 1][col]) {
      break;
    }
    if (i === 1) {
      return tableMatrix[row][col];
    }
  }
  // check diagonal
  if (row === col) {
    for (let i = 0; i < 2; i++) {
      if (tableMatrix[i][i] === '' || tableMatrix[i + 1][i + 1] === '' || tableMatrix[i][i] !== tableMatrix[i + 1][i + 1]) {
        break;
      }
      if (i === 1) {
        return tableMatrix[row][col];
      }
    }
  }
  // check antiDia
  if (row + col === 2) {
    for (let i = 0; i < 2; i++) {
      // tslint:disable-next-line:max-line-length
      if (tableMatrix[i][2 - i] === '' || tableMatrix[i + 1][2 - i - 1] === '' || tableMatrix[i][2 - i] !== tableMatrix[i + 1][2 - i - 1]) {
        break;
      }
      if (i === 1) {
        return tableMatrix[row][col];
      }
    }
  }
  return 'N'; // there is no winner
}*/

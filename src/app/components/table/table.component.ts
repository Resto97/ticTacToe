import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  public turnCounter = 0;
  public isThereWinner = false;
  public displayMessage = '';
  public nextPlayer = 'X';
  public columnMatrix: string[][] = [];
  public rowMatrix: string[][] = [];
  public signsForWinner = 4;
  public tableWidth = 5;
  public tableHeight = 4;
  public numbers = Array(this.tableHeight).fill(0);
  public numbers1 = Array(this.tableWidth).fill(0);

  constructor(private calculationService: CalculationService) {
    this.resetTableMatrix();
  }

  @ViewChildren(CellComponent)
  childCells!: QueryList<CellComponent>;

  resetCells() {
    this.childCells.forEach(c => c.reset());
  }
  disableCells() {
    this.childCells.forEach(c => c.disableCell());
  }
  resetTableMatrix() {
    for (let i = 0; i < this.tableWidth; i++) {
      this.columnMatrix[i] = Array(this.tableHeight).fill('');
    }
    for (let i = 0; i < this.tableHeight; i++) {
      this.rowMatrix[i] = Array(this.tableWidth).fill('');
    }
  }
  resetGame($event: any) {
    this.turnCounter = 0;
    this.isThereWinner = false;
    this.displayMessage = '';
    this.nextPlayer = 'X';
    this.resetTableMatrix();
    this.resetCells();
  }
  weHaveWinner() {
    this.isThereWinner = true;
    this.displayMessage = 'Winner is ' + this.nextPlayer;
    this.disableCells();
  }
  cellIsClicked(row: number, column: number) {
    this.turnCounter++;
    this.columnMatrix[column][row] = this.nextPlayer;
    this.rowMatrix[row][column] = this.nextPlayer;
    // check the winner in the row of last move
    if (this.turnCounter > this.signsForWinner * 2 - 2) {
      let getWinner = this.calculationService.getWinnerIfThereIsOne(this.rowMatrix[row], this.signsForWinner);
      if (getWinner !== 'N') {
        alert(getWinner);
        this.weHaveWinner();
      }
      // check the winner in the column of last move
      getWinner = this.calculationService.getWinnerIfThereIsOne(this.columnMatrix[column], this.signsForWinner);
      if (getWinner !== 'N') {
        alert(getWinner);
        this.weHaveWinner();
      }
      // check diagonal
      // add elementes top left of last/current play to diagonalarray
      const diagonalArray: string[] = Array(1).fill('');
      let isThereMoreElements = true;
      let rowNumberToCheck = row;
      let colNumberToCheck = column;
      diagonalArray.unshift(this.nextPlayer);
      while (isThereMoreElements) {
        rowNumberToCheck--;
        colNumberToCheck--;
        if (rowNumberToCheck > -1 && colNumberToCheck > -1) {
          diagonalArray.unshift(this.rowMatrix[rowNumberToCheck][colNumberToCheck]);
        }
        else {
          isThereMoreElements = false;
        }
      }
      // add elementes bottom right of last/current play to diagonalarray
      isThereMoreElements = true;
      rowNumberToCheck = row;
      colNumberToCheck = column;
      diagonalArray.pop();
      while (isThereMoreElements) {
        rowNumberToCheck++;
        colNumberToCheck++;
        if (rowNumberToCheck < this.tableHeight && colNumberToCheck < this.tableWidth) {
          diagonalArray.push(this.rowMatrix[rowNumberToCheck][colNumberToCheck]);
        }
        else {
          isThereMoreElements = false;
        }
      }
      // If diagonal has more elements or equal than necessary to win the game, check if there is winner
      if (diagonalArray.length >= this.signsForWinner) {
        getWinner = this.calculationService.getWinnerIfThereIsOne(diagonalArray, this.signsForWinner);
        if (getWinner !== 'N') {
          alert(getWinner);
          this.weHaveWinner();
        }
      }
      // check antidiagonal
      const antiDiagonalArray: string[] = Array(1).fill('');
      // Adding elements bottom left of current play to antiDiagonaArray
      isThereMoreElements = true;
      rowNumberToCheck = row;
      colNumberToCheck = column;
      antiDiagonalArray.unshift(this.nextPlayer);
      while (isThereMoreElements) {
        rowNumberToCheck++;
        colNumberToCheck--;
        if (rowNumberToCheck < this.tableHeight && colNumberToCheck > -1) {
          antiDiagonalArray.unshift(this.rowMatrix[rowNumberToCheck][colNumberToCheck]);
        }
        else {
          isThereMoreElements = false;
        }
      }
      antiDiagonalArray.pop();
      // Adding elements top right of current play to antiDiagonaArray
      isThereMoreElements = true;
      rowNumberToCheck = row;
      colNumberToCheck = column;
      while (isThereMoreElements) {
        rowNumberToCheck--;
        colNumberToCheck++;
        if (rowNumberToCheck > -1 && colNumberToCheck < this.tableWidth) {
          antiDiagonalArray.push(this.rowMatrix[rowNumberToCheck][colNumberToCheck]);
        }
        else {
          isThereMoreElements = false;
        }
      }
      // If antiDiagonal has more elements or equal than necessary to win the game, check if there is winner
      if (antiDiagonalArray.length >= this.signsForWinner) {
        getWinner = this.calculationService.getWinnerIfThereIsOne(antiDiagonalArray, this.signsForWinner);
        if (getWinner !== 'N') {
          alert(getWinner);
          this.weHaveWinner();
        }
      }
      // Check if it's tie
      if (this.turnCounter === this.tableHeight * this.tableWidth) {
        this.isThereWinner = true;
        this.displayMessage = 'Its a tie';
        return;
      }
    }
    this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';
  }
}



/* this.turnCounter++;
    this.tableMatrix[row][column] = this.nextPlayer;
    if (this.turnCounter > 4) {
      const getWinner = this.calculationService.getWinnerIfThereIs(this.tableMatrix, row, column);
      if (getWinner !== 'N') {  // N is returned when there is no winner
        this.winner = true;
        this.displayMessage = 'Winner is ' + this.nextPlayer;
        this.getNthColumn(0);
        console.log(this.columnMatrix);
        console.log(this.columnMatrix[0]);
        this.disableCells();
        return;
      }
      if (this.turnCounter === 9) {
        this.winner = true;
        this.displayMessage = 'Its a tie';
        return;
      }
    }
    this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';*/

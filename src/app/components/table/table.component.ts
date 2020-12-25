import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { CellComponent } from '../cell/cell.component';
import { TableConfig, Matrix, Sign } from '../../services/table-config';
import { getMajorDiagonalLength, getMajorDiagonalStart, getMinorDiagonalStart, getMinorDiagonalLength } from 'src/app/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  public turnCounter = 0;
  public isThereWinner = false;
  public displayMessage = '';
  public nextPlayer: Sign = 'X';

  public columnMatrix: Matrix<Sign> = [];
  public rowMatrix: Matrix<Sign> = [];
  public signsForWinner = this.tableConfig.signsNeededForWin;
  public tableWidth = this.tableConfig.columnsCount;
  public tableHeight = this.tableConfig.rowsCount;

  constructor(
    private calculationService: CalculationService,
    private readonly tableConfig: TableConfig,
  ) {
    this.resetTableMatrix();
  }

  @ViewChildren(CellComponent)
  childCells!: QueryList<CellComponent>;

  resetTableMatrix() {
    this.rowMatrix = this.tableConfig.createEmptyTable();
    this.columnMatrix = [];
    for (let i = 0; i < this.tableWidth; i++) {
      this.columnMatrix[i] = Array.from<''>({ length: this.tableHeight }).fill('');
    }
  }

  resetGame($event: any) {
    this.turnCounter = 0;
    this.isThereWinner = false;
    this.displayMessage = '';
    this.nextPlayer = 'X';
    this.resetTableMatrix();
  }

  weHaveWinner() {
    this.isThereWinner = true;
    this.displayMessage = 'Winner is ' + this.nextPlayer;
  }

  cellIsClicked(row: number, column: number) {
    console.log('clicked', row, column, this.tableConfig);
    this.turnCounter++;
    this.columnMatrix[column][row] = this.nextPlayer;
    this.rowMatrix[row][column] = this.nextPlayer;
    console.log(this.rowMatrix);
    const winner = this.getWinner(row, column);

    if (winner !== 'N') {
      this.weHaveWinner();
    }
    this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';
  }

  private getWinner(row: number, column: number) {
    const checks = [
      // rows
      () => this.calculationService.getWinnerIfThereIsOne(
        this.rowMatrix,
        { i: row, j: 0 },
        0, 1,
        this.tableWidth, this.signsForWinner,
      ),
      // columns
      () => this.calculationService.getWinnerIfThereIsOne(
        this.rowMatrix,
        { i: 0, j: column },
        1, 0,
        this.tableHeight, this.signsForWinner
      ),
      // major diagonal
      () => this.calculationService.getWinnerIfThereIsOne(
        this.rowMatrix,
        getMajorDiagonalStart({ i: row, j: column }),
        1, 1,
        getMajorDiagonalLength(getMajorDiagonalStart({ i: row, j: column }), this.tableWidth, this.tableHeight),
        this.signsForWinner
      ),
      // minor diagonal
      () => this.calculationService.getWinnerIfThereIsOne(
        this.rowMatrix,
        getMinorDiagonalStart({ i: row, j: column }, this.tableWidth),
        1, -1,
        getMinorDiagonalLength( getMinorDiagonalStart({ i: row, j: column }, this.tableWidth), this.tableWidth, this.tableHeight),
        this.signsForWinner
      ),
    ];
    return checks.find(check => {
      const winner = check();
      return winner === 'X' || winner === 'O';
    }) ?? 'N';
  }

}

/*
/* this.turnCounter++;
    this.tableMatrix[row][column] = this.nextPlayer;
    if (this.turnCounter > this.tableConfig.minimalTurnsToWin) {
      const getWinner = this.calculationService.getWinnerIfThereIs(this.tableMatrix, row, column);
      if (getWinner !== '') {
        this.hasWinnerOrTie = true;
        this.displayMessage = 'Winner is ' + this.nextPlayer;
        this.getNthColumn(0);
        console.log(this.columnMatrix);
        console.log(this.columnMatrix[0]);
        this.disableCells();
        return;
      }
      if (this.turnCounter === this.tableConfig.cellsCount) {
        this.hasWinnerOrTie = true;
        this.displayMessage = 'Its a tie';
        return;
      }
    }
    this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';*/

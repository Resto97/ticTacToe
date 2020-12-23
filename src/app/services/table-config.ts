export type Sign = 'X' | 'O' | '';
export type Matrix<T> = Array<Array<T>>;

export class TableConfig {

  public constructor(
    public readonly rowsCount: number,
    public readonly columnsCount: number,
    public readonly signsNeededForWin: number,
  ) { }

  public get cellsCount(): number {
    return this.rowsCount * this.columnsCount;
  }

  public get minimalTurnsToWin(): number {
    return (this.signsNeededForWin - 1) * 2;
  }

  public createEmptyTable(): Matrix<Sign> {
    const matrix: Matrix<Sign> = [];
    for (let i = 0; i < this.rowsCount; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.columnsCount; j++) {
        matrix[i][j] = '';
      }
    }
    return matrix;
  }

}

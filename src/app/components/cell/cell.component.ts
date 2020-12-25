import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sign } from '../../services/table-config';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  @Input()
  public sign!: Sign;

  @Input()
  public isDisabled = false;

  @Output()
  cellClicked = new EventEmitter();

  public get isX(): boolean {
    return this.sign === 'X' ? true : false;
  }

  public get isO(): boolean {
    return this.sign === 'O' ? true : false;
  }

  updateCellState(): void {
    // alert(this.sign);
    this.cellClicked.emit();
  }

}

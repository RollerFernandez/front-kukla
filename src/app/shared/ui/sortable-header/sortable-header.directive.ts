import { Directive, EventEmitter, Input, Output } from '@angular/core';
export type SortDirection = 'ASC' | 'DESC' | '';
const rotate: { [key: string]: SortDirection } = { ASC: 'DESC', DESC: 'ASC', '': 'ASC' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "ASC"',
    '[class.desc]': 'direction === "DESC"',
    '(click)': 'rotate()'
  }
})

export class SortableHeaderDirective {

  constructor() { }

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

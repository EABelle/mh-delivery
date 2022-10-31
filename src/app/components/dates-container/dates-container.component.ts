import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dates-container',
  templateUrl: './dates-container.component.html',
  styleUrls: ['./dates-container.component.scss']
})
export class DatesContainerComponent {

  @Input() public dates: string[];
  @Input() public selectedDate: string | null = null;
  @Output() public selectDate = new EventEmitter<string>();

  constructor() { }

  onSelectDate(date: string) {
    this.selectDate.emit(date);
  }

  isSelected(date: string): boolean {
    return date === this.selectedDate;
  }
}

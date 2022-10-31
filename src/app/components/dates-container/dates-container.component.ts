import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dates-container',
  templateUrl: './dates-container.component.html',
  styleUrls: ['./dates-container.component.scss']
})
export class DatesContainerComponent {

  @Input() public dates: string[];
  @Output() public selectDate = new EventEmitter<string>();

  constructor() { }

  onSelectDate(date: string) {
    this.selectDate.emit(date);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() checked: boolean = false;
  @Input() label: string = '';
  @Output() check = new EventEmitter<boolean>();

  onChange() {
    this.check.emit();
  }
}

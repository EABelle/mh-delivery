import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() click = new EventEmitter<void>();
  onClick() {
    this.click.emit();
  }
}

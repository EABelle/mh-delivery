import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeliveryTime } from 'src/app/models/delivery-time.model';

@Component({
  selector: 'app-slots-container',
  templateUrl: './slots-container.component.html',
  styleUrls: ['./slots-container.component.scss']
})
export class SlotsContainerComponent {

  @Input() public slots: DeliveryTime[];
  @Input() public selectedSlot: DeliveryTime | null = null;
  @Output() public selectSlot = new EventEmitter<DeliveryTime>();

  constructor() { }

  onSelectSlot(slot: DeliveryTime) {
    this.selectSlot.emit(slot);
  }

  isSelected(slot: DeliveryTime): boolean {
    return slot.deliveryTimeId === this.selectedSlot?.deliveryTimeId;
  }
}

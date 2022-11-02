import { Component, OnInit } from '@angular/core';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { DeliveryCacheService } from 'src/app/services/delivery-cache-service/delivery-cache.service';

@Component({
  selector: 'app-delivery-confirmation-page',
  templateUrl: './delivery-confirmation-page.component.html',
  styleUrls: ['./delivery-confirmation-page.component.scss']
})
export class DeliveryConfirmationPageComponent implements OnInit {

  selectedDate: string | null = null;
  selectedTime: DeliveryTime | null = null;

  constructor(
    private deliveryCacheService: DeliveryCacheService
  ) { }

  ngOnInit(): void {
    this.selectedDate = this.deliveryCacheService.getSelectedDate();
    this.selectedTime = this.deliveryCacheService.getSelectedTime();
  }

}

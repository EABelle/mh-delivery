import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery-service/delivery.service';

@Component({
  selector: 'app-delivery-details-page',
  templateUrl: './delivery-details-page.component.html',
  styleUrls: ['./delivery-details-page.component.scss']
})
export class DeliveryDetailsPageComponent implements OnInit {

  dates: String[] = [];
  selectedDate: String | null = null;

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this.deliveryService.getAvailableDates().subscribe(
      dates => this.dates = dates
    )
  }

  selectDate(date: String) {
    this.selectedDate = date;
  }

}

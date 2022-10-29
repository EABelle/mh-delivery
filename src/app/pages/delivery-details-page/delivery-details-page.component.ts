import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription, switchMap } from 'rxjs';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { DeliveryService } from 'src/app/services/delivery-service/delivery.service';

@Component({
  selector: 'app-delivery-details-page',
  templateUrl: './delivery-details-page.component.html',
  styleUrls: ['./delivery-details-page.component.scss']
})
export class DeliveryDetailsPageComponent implements OnInit, OnDestroy {

  dates: string[] = [];
  times: DeliveryTime[] = [];
  filteredTimes: DeliveryTime[] = [];
  selectedDate: string | null = null;
  selectedTime: DeliveryTime | null = null;
  deliveryDateSubscription: Subscription | null = null;
  deliveryTimeSubscription: Subscription | null = null;
  onlyHomeDelivery = false

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this.deliveryService.getAvailableDates().then(dates => {
      this.dates = dates;
    });
    this.deliveryDateSubscription = this.deliveryService.getSelectedDate()
      .pipe(
        filter(date => !!date),
        switchMap(date => {
          this.selectedDate = date;
          return this.deliveryService.getAvailableTimes(date!!)
        })
      ).subscribe(times => {
        this.times = times;
        this.setFilteredTimes();
      });
    this.deliveryTimeSubscription = this.deliveryService.getSelectedTime()
      .subscribe(time => this.selectedTime = time);
    this.deliveryService.getHomeDelivery()
      .subscribe(onlyHomeDelivery => {
        this.onlyHomeDelivery = onlyHomeDelivery;
        this.setFilteredTimes();
        if (
          this.selectedTime &&
          !this.filteredTimes.map(({ deliveryTimeId }) => deliveryTimeId).includes(this.selectedTime.deliveryTimeId)
        ) {
          this.selectTime(null);
        }
      })
  }

  ngOnDestroy(): void {
    this.deliveryDateSubscription?.unsubscribe()
    this.deliveryTimeSubscription?.unsubscribe()
  }

  public selectDate(date: string) {
    this.selectedDate = this.deliveryService.setSelectedDate(date);
  }

  public selectTime(time: DeliveryTime | null) {
    this.selectedTime = this.deliveryService.setSelectedTime(time);
  }

  public onHomeDeliveryClick() {
    this.deliveryService.switchHomeDelivery();
  }

  private setFilteredTimes() {
      this.filteredTimes = this.onlyHomeDelivery 
        ? this.times.filter(({ inHomeAvailable }) => inHomeAvailable)
        : this.times;
  }
}

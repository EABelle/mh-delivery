import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { DeliveryService } from 'src/app/services/delivery-service/delivery.service';
import { DeliveryHTTPService } from 'src/app/services/http-clients/delivery-http.service';

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
  homeDeliverySubscription: Subscription | null = null;
  onlyHomeDelivery = false

  constructor(
    private deliveryService: DeliveryService,
    private deliveryHTTPService: DeliveryHTTPService
  ) { }

  private subscribeSelectedDate() {
    this.deliveryDateSubscription = this.deliveryService.getSelectedDate()
      .pipe(
        filter(date => !!date),
        tap(date => {
          this.selectedDate = date;
        })
      ).subscribe(date => {
        this.deliveryHTTPService.fetchAvailableTimes(date!!)
          .then(times => {
            this.times = times;
            this.setFilteredTimes();
          })
      });
  }

  private subscribeDeliveryTime() {
    this.deliveryTimeSubscription = this.deliveryService.getSelectedTime()
      .subscribe(time => this.selectedTime = time);
  }

  private subscribeIsHomeDelivery() {
    this.homeDeliverySubscription = this.deliveryService.getHomeDelivery()
      .subscribe(onlyHomeDelivery => {
        this.onlyHomeDelivery = onlyHomeDelivery;
        this.setFilteredTimes();
        if (!this.validateSelectedTime()) {
          this.selectTime(null);
        }
      })
  }

  ngOnInit(): void {
    this.deliveryHTTPService.fetchAvailableDates()
      .then(dates => {
        this.dates = dates;
        this.deliveryService.initState(dates);
      });
    this.subscribeSelectedDate();
    this.subscribeDeliveryTime();
    this.subscribeIsHomeDelivery();
  }

  ngOnDestroy(): void {
    this.deliveryDateSubscription?.unsubscribe();
    this.deliveryTimeSubscription?.unsubscribe();
    this.homeDeliverySubscription?.unsubscribe();
  }

  public selectDate(date: string) {
    this.selectedDate = this.deliveryService.setSelectedDate(date);
  }

  public selectTime(time: DeliveryTime | null) {
    this.selectedTime = this.deliveryService.setSelectedTime(time);
  }

  public onHomeDeliveryClick() {
    this.deliveryService.setHomeDelivery(!this.onlyHomeDelivery);
  }

  private setFilteredTimes() {
      this.filteredTimes = this.onlyHomeDelivery 
        ? this.times.filter(({ inHomeAvailable }) => inHomeAvailable)
        : this.times;
  }

  private validateSelectedTime(): boolean {
    return this.selectedTime == null ||
      this.filteredTimes.map(({ deliveryTimeId }) => deliveryTimeId).includes(this.selectedTime.deliveryTimeId)
  }
}

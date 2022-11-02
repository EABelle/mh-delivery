import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoutePath } from 'src/app/app-routing.module';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { DeliveryStateService } from 'src/app/services/delivery-state-service/delivery-state.service';
import { DeliveryHTTPService } from 'src/app/services/delivery-http-service/delivery-http.service';

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
  onlyHomeDelivery = false;
  loading: boolean;
  continueLink = ['/', RoutePath.DeliveryConfirmation]

  constructor(
    private deliveryStateService: DeliveryStateService,
    private deliveryHTTPService: DeliveryHTTPService
  ) {
    this.loading = true;
   }

  private subscribeSelectedDate() {
    this.deliveryDateSubscription = this.deliveryStateService.getDate()
      .subscribe(date => {
        if (!date) return;
        this.selectedDate = date;
        this.deliveryHTTPService.fetchAvailableTimes(date!!)
          .then(times => {
            this.times = times;
            this.setFilteredTimes();
          })
      });
  }

  private subscribeDeliveryTime() {
    this.deliveryTimeSubscription = this.deliveryStateService.getTime()
      .subscribe(time => this.selectedTime = time);
  }

  private subscribeIsHomeDelivery() {
    this.homeDeliverySubscription = this.deliveryStateService.getIsHomeDelivery()
      .subscribe(onlyHomeDelivery => {
        this.onlyHomeDelivery = onlyHomeDelivery;
        this.setFilteredTimes();
      })
  }

  ngOnInit(): void {
    this.deliveryHTTPService.fetchAvailableDates()
      .then(dates => {
        this.dates = dates;
        this.loading = false;
        this.deliveryStateService.initState(dates);
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
    this.selectedDate = this.deliveryStateService.setDate(date);
  }

  public selectTime(time: DeliveryTime) {
    this.selectedTime = this.deliveryStateService.setTime(time);
  }

  public onHomeDeliveryClick() {
    this.deliveryStateService.setIsHomeDelivery(!this.onlyHomeDelivery);
  }

  private setFilteredTimes() {
      this.filteredTimes = this.onlyHomeDelivery 
        ? this.times.filter(({ inHomeAvailable }) => inHomeAvailable)
        : this.times;
  }
}

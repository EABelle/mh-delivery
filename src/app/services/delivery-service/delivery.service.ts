import { Injectable } from '@angular/core';
import { CacheService } from '../cache-service/cache.service';
import { DeliveryHTTPService } from '../http-clients/delivery-http.service';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { Observable, Subject } from 'rxjs';

enum CACHE_KEY {
  SELECTED_DATE = 'selectedDate',
  SELECTED_TIME = 'selectedTime',
  HOME_DELIVERY = 'homeDelivery'
}
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private dateSubject = new Subject<string | null>();
  private timeSubject = new Subject<DeliveryTime | null>();
  private homeDeliverySubject = new Subject<boolean>();

  constructor(
    private deliveryHTTPService: DeliveryHTTPService,
    private cacheService: CacheService
  ) {}

  public getAvailableDates(): Promise<string[]> {
    return this.deliveryHTTPService.fetchAvailableDates()
      .then(dates => {
        const selectedDate = this.cacheService.getData(CACHE_KEY.SELECTED_DATE);
        if (selectedDate && !dates.includes(selectedDate)) {
          this.removeSelectedDate();
        }
        this.dateSubject.next(selectedDate);
        const timesCache = this.cacheService.getData(CACHE_KEY.SELECTED_TIME);
        const times: DeliveryTime | null = timesCache ? JSON.parse(timesCache) : null;
        const homeDeliveryCache = this.cacheService.getData(CACHE_KEY.HOME_DELIVERY);
        const onlyHomeDelivery: boolean = homeDeliveryCache ? JSON.parse(homeDeliveryCache) : false;
        this.homeDeliverySubject.next(onlyHomeDelivery);
        this.timeSubject.next(times);
        return dates;
      });
  }
  public getAvailableTimes(date: string): Promise<DeliveryTime[]> {
    return this.deliveryHTTPService.fetchAvailableTimes(date);
  }
  public getSelectedDate(): Observable<string | null>  {
    return this.dateSubject.asObservable();
  }
  public getSelectedTime(): Observable<DeliveryTime | null>  {
    return this.timeSubject.asObservable();
  }
  public setSelectedDate(date: string): string {
    this.cacheService.saveData(CACHE_KEY.SELECTED_DATE, date);
    this.cacheService.removeData(CACHE_KEY.SELECTED_TIME);
    this.dateSubject.next(date);
    this.timeSubject.next(null);
    return date;
  }
  public setSelectedTime(time: DeliveryTime | null): DeliveryTime | null {
    if (time) {
      this.cacheService.saveData(CACHE_KEY.SELECTED_TIME, JSON.stringify(time));
    } else {
      this.cacheService.removeData(CACHE_KEY.SELECTED_TIME);
    }
    this.timeSubject.next(time);
    return time;
  }
  public removeSelectedDate(): void {
    this.cacheService.removeData(CACHE_KEY.SELECTED_DATE);
    this.dateSubject.next(null);
  }
  public removeSelectedTime(): void {
    this.cacheService.removeData(CACHE_KEY.SELECTED_TIME);
    this.timeSubject.next(null);
  }
  public getHomeDelivery(): Observable<boolean> {
    return this.homeDeliverySubject.asObservable();
  }
  public switchHomeDelivery(): boolean {
    const cacheData = this.cacheService.getData(CACHE_KEY.HOME_DELIVERY);
    const isHomeDelivery = cacheData ? JSON.parse(cacheData) : false;
    this.cacheService.saveData(CACHE_KEY.HOME_DELIVERY, JSON.stringify(!isHomeDelivery));
    this.homeDeliverySubject.next(!isHomeDelivery);
    return !isHomeDelivery;
  }
}

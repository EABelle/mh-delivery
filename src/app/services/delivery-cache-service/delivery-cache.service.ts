import { Injectable } from '@angular/core';
import { CacheService } from '../cache-service/cache.service';
import { DeliveryTime } from 'src/app/models/delivery-time.model';

enum CACHE_KEY {
  SELECTED_DATE = 'selectedDate',
  SELECTED_TIME = 'selectedTime',
  HOME_DELIVERY = 'homeDelivery'
}
@Injectable({
  providedIn: 'root'
})
export class DeliveryCacheService {

  constructor(
    private cacheService: CacheService
  ) {}

  public getSelectedDate(): string | null {
    return this.cacheService.getData(CACHE_KEY.SELECTED_DATE);
  }

  public setSelectedDate(date: string): string {
    this.cacheService.saveData(CACHE_KEY.SELECTED_DATE, date);
    return date;
  }

  public removeSelectedDate(): void {
    this.cacheService.removeData(CACHE_KEY.SELECTED_DATE);
  }

  public getDeliveryTime(): DeliveryTime | null {
    const timesCache = this.cacheService.getData(CACHE_KEY.SELECTED_TIME);
    return timesCache ? JSON.parse(timesCache) : null;
  }

  public setSelectedTime(time: DeliveryTime): DeliveryTime {
    this.cacheService.saveData(CACHE_KEY.SELECTED_TIME, JSON.stringify(time));
    return time;
  }

  public removeSelectedTime(): void {
    this.cacheService.removeData(CACHE_KEY.SELECTED_TIME);
  }

  public getIsHomeDelivery(): boolean {
    const homeDeliveryCache = this.cacheService.getData(CACHE_KEY.HOME_DELIVERY);
    return homeDeliveryCache ? JSON.parse(homeDeliveryCache) : false;
  }

  public setIsHomeDelivery(isHomeDelivery: boolean): boolean {
    this.cacheService.saveData(CACHE_KEY.HOME_DELIVERY, JSON.stringify(isHomeDelivery));
    return isHomeDelivery;
  }
}

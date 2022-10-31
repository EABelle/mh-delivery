import { Injectable } from '@angular/core';
import { DeliveryHTTPService } from '../http-clients/delivery-http.service';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { Observable, Subject } from 'rxjs';
import { DeliveryCacheService } from '../delivery-cache-service/delivery-cache.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private dateSubject = new Subject<string | null>();
  private timeSubject = new Subject<DeliveryTime | null>();
  private homeDeliverySubject = new Subject<boolean>();

  constructor(
    private deliveryCacheService: DeliveryCacheService
  ) {}

  // Stored state
  public initState(dates: string[]) {
    const selectedDate = this.deliveryCacheService.getSelectedDate();
    if (this.dateIsValid(selectedDate, dates)) {
      this.removeSelectedDate();
    }
    const time = this.deliveryCacheService.getDeliveryTime();
    const onlyHomeDelivery = this.deliveryCacheService.getIsHomeDelivery();

    this.dateSubject.next(selectedDate);
    this.timeSubject.next(time);
    this.homeDeliverySubject.next(onlyHomeDelivery);
  }
  
  // Selected date
  
  private dateIsValid(selectedDate: string | null, dates: string[]): boolean {
    return !!selectedDate && !dates.includes(selectedDate)
  }

  public getSelectedDate(): Observable<string | null>  {
    return this.dateSubject.asObservable();
  }

  public setSelectedDate(date: string): string {
    this.deliveryCacheService.setSelectedDate(date);
    this.dateSubject.next(date);
    this.timeSubject.next(null);
    return date;
  }

  private removeSelectedDate(): void {
    this.deliveryCacheService.removeSelectedDate();
    this.dateSubject.next(null);
  }

  // Selected time

  public getSelectedTime(): Observable<DeliveryTime | null>  {
    return this.timeSubject.asObservable();
  }

  public setSelectedTime(time: DeliveryTime | null): DeliveryTime | null {
    if (time) {
      this.deliveryCacheService.setSelectedTime(time);
    } else {
      this.deliveryCacheService.removeSelectedTime();
    }
    this.timeSubject.next(time);
    return time;
  }

  public removeSelectedTime(): void {
    this.deliveryCacheService.removeSelectedTime();
    this.timeSubject.next(null);
  }

  // isHomeDelivery

  public getHomeDelivery(): Observable<boolean> {
    return this.homeDeliverySubject.asObservable();
  }

  public setHomeDelivery(isHomeDelivery: boolean): boolean {
    this.deliveryCacheService.setIsHomeDelivery(isHomeDelivery);
    this.homeDeliverySubject.next(isHomeDelivery);
    return isHomeDelivery;
  }
}

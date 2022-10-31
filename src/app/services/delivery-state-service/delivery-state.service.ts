import { Injectable } from '@angular/core';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { Observable, Subject } from 'rxjs';
import { DeliveryCacheService } from '../delivery-cache-service/delivery-cache.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryStateService {

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
      this.clearState();
    }
    const time = this.deliveryCacheService.getDeliveryTime();
    const onlyHomeDelivery = this.deliveryCacheService.getIsHomeDelivery();

    this.dateSubject.next(selectedDate);
    this.timeSubject.next(time);
    this.homeDeliverySubject.next(onlyHomeDelivery);
  }

  private clearState(): void {
    this.deliveryCacheService.removeSelectedDate();
    this.deliveryCacheService.removeSelectedTime();
    this.dateSubject.next(null);
    this.timeSubject.next(null);
  }
  
  // Selected date
  
  private dateIsValid(selectedDate: string | null, dates: string[]): boolean {
    return !!selectedDate && !dates.includes(selectedDate)
  }

  public getDate(): Observable<string | null>  {
    return this.dateSubject.asObservable();
  }

  public setDate(date: string): string {
    this.deliveryCacheService.setSelectedDate(date);
    this.dateSubject.next(date);
    return date;
  }

  // Selected time

  public getTime(): Observable<DeliveryTime | null>  {
    return this.timeSubject.asObservable();
  }

  public setTime(time: DeliveryTime): DeliveryTime {
    this.deliveryCacheService.setSelectedTime(time);
    this.timeSubject.next(time);
    return time;
  }

  // isHomeDelivery

  public getIsHomeDelivery(): Observable<boolean> {
    return this.homeDeliverySubject.asObservable();
  }

  public setIsHomeDelivery(isHomeDelivery: boolean): boolean {
    this.deliveryCacheService.setIsHomeDelivery(isHomeDelivery);
    this.homeDeliverySubject.next(isHomeDelivery);
    return isHomeDelivery;
  }
}

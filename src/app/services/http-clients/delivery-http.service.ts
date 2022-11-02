import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { DeliveryTimeDTO } from 'src/app/dtos/delivery-time.dto';
import { DeliveryTimeTransformer } from 'src/app/dtos/transformers/delivery-time.transformer';
import { DeliveryTime } from 'src/app/models/delivery-time.model';
import { compareDates, compareTimes } from 'src/app/utils/date';

enum ENDPOINT {
  DATES = 'dates',
  TIMES = 'times'
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryHTTPService {
  private readonly BASE_URL = 'https://api.mathem.io/mh-test-assignment/delivery';
  private readonly deliveryTimeTransformer = new DeliveryTimeTransformer();

  constructor(
    private http: HttpClient
  ) { }

  public fetchAvailableDates(): Promise<string[]> {
    const url = `${this.BASE_URL}/${ENDPOINT.DATES}`;
    const response$ = this.http.get<string[]>(url);
    return lastValueFrom(response$).then(dates => dates.sort(compareDates));
  }

  public async fetchAvailableTimes(date: string): Promise<DeliveryTime[]> {
    const url = `${this.BASE_URL}/${ENDPOINT.TIMES}/${date}`;
    console.log(url);
    const response$ = this.http.get<DeliveryTimeDTO[]>(url)
    const deliveryTimes = await lastValueFrom(response$);
    return this.deliveryTimeTransformer
      .transformList(deliveryTimes)
      .sort(compareTimes);
  }
}

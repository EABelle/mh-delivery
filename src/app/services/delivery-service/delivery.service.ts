import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpClient
  ) { }

  public getAvailableDates(): Observable<String[]> {
    return this.http.get<String[]>('https://api.mathem.io/mh-test-assignment/delivery/dates');
  }
  public getAvailableTimes(date: String): Observable<String[]> {
    return this.http.get<String[]>(`https://api.mathem.io/mh-test-assignment/delivery/times/${date}`);
  }
}

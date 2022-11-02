import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeliveryHTTPService } from './delivery-http.service';

enum URL {
  DELIVERY_DATES = 'https://api.mathem.io/mh-test-assignment/delivery/dates',
  DELIVERY_TIMES = 'https://api.mathem.io/mh-test-assignment/delivery/times'
}

describe('DeliveryHTTPService', () => {
  let service: DeliveryHTTPService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryHTTPService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DeliveryHTTPService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of dates', async () => {
    const dates = service.fetchAvailableDates();
    const req = httpMock.expectOne(URL.DELIVERY_DATES);
    expect(req.request.method).toBe('GET');
    req.flush(['2021-01-01', '2021-01-02', '2021-01-03']);
    expect(await dates).toEqual(['2021-01-01', '2021-01-02', '2021-01-03']);
  });

  it('should return a list of time slots for a date', async () => {
    const timeSlots = service.fetchAvailableTimes('2023-01-01');
    const req = httpMock.expectOne(`${URL.DELIVERY_TIMES}/2023-01-01`);
    expect(req.request.method).toBe('GET');
    const responseMatch = [{
      deliveryTimeId: '1',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '09:00',
      inHomeAvailable: true
    }];
    req.flush(responseMatch);
    const response = await timeSlots;
    expect(response.map((timeSlot) => ({...timeSlot}))).toEqual(responseMatch);
  });
  
  it('should sort the time slots by start time', async () => {
    const timeSlots = service.fetchAvailableTimes('2023-01-01');
    const req = httpMock.expectOne(`${URL.DELIVERY_TIMES}/2023-01-01`);
    expect(req.request.method).toBe('GET');
    const responseData = [{
      deliveryTimeId: '1',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '09:00',
      inHomeAvailable: true
    }, {
      deliveryTimeId: '2',
      deliveryDate: '2023-01-01',
      startTime: '12:00',
      stopTime: '13:00',
      inHomeAvailable: true
    }, {
      deliveryTimeId: '3',
      deliveryDate: '2023-01-01',
      startTime: '10:00',
      stopTime: '11:00',
      inHomeAvailable: false
    }];
    req.flush(responseData);
    const response = await timeSlots;
    expect(response.map((timeSlot) => ({...timeSlot}))).toEqual([responseData[0], responseData[2], responseData[1]]);
  });

  it('should sort the time slots by start time and end time', async () => {
    const timeSlots = service.fetchAvailableTimes('2023-01-01');
    const req = httpMock.expectOne(`${URL.DELIVERY_TIMES}/2023-01-01`);
    expect(req.request.method).toBe('GET');
    const responseData = [{
      deliveryTimeId: '1',
      deliveryDate: '2023-01-01',
      startTime: '10:00',
      stopTime: '11:00',
      inHomeAvailable: true
    }, {
      deliveryTimeId: '2',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '10:00',
      inHomeAvailable: true
    }, {
      deliveryTimeId: '3',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '08:30',
      inHomeAvailable: false
    }];
    req.flush(responseData);
    const response = await timeSlots;
    expect(response.map((timeSlot) => ({...timeSlot})))
      .toEqual([responseData[2], responseData[1], responseData[0]]);
  });
});

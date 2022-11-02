import { TestBed } from '@angular/core/testing';
import { DeliveryCacheService } from '../delivery-cache-service/delivery-cache.service';

import { DeliveryStateService } from './delivery-state.service';

describe('DeliveryStateService', () => {
  let service: DeliveryStateService;
  let cacheService: DeliveryCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryStateService);
    cacheService = TestBed.inject(DeliveryCacheService);
    cacheService.removeSelectedDate();
    cacheService.removeSelectedTime();
    cacheService.setIsHomeDelivery(false);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDate / setDate', () => {

    it('should return a date', (done: DoneFn) => {
      service.getDate().subscribe(value => {
        expect(value).toBe('2023-01-01');
        done();
      });
      service.setDate('2023-01-01');
    });

  });

  describe('getTime / setTime', () => {      
    it('should return a time', (done: DoneFn) => {
      service.getTime().subscribe(value => {
        expect(value).toEqual({
          deliveryTimeId: '1',
          deliveryDate: '2023-01-01',
          startTime: '08:00',
          stopTime: '09:00',
          inHomeAvailable: true
        });
        done();
      });
      service.setTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
    });
  });

  describe('getIsHomeDelivery / setIsHomeDelivery', () => {
    it('should return true when it is set to true', (done: DoneFn) => {
      service.getIsHomeDelivery().subscribe(value => {
        expect(value).toBe(true);
        done();
      });
      service.setIsHomeDelivery(true);
    });
    it('should return false when it is set to false', (done: DoneFn) => {
      service.getIsHomeDelivery().subscribe(value => {
        expect(value).toBe(false);
        done();
      });
      service.setIsHomeDelivery(false);
    });
    it('should reset time when has no in home delivery', (done: DoneFn) => {
      service.setIsHomeDelivery(false);
      service.setTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: false
      });
      service.getTime().subscribe(value => {
        expect(value).toBeNull();
        done();
      });
      service.setIsHomeDelivery(true);
    });
    it('should not reset time when has in home delivery', () => {
      service.setIsHomeDelivery(false);
      service.setTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
      const callback = jasmine.createSpy('callback');
      service.getTime().subscribe(callback);
      service.setIsHomeDelivery(true);
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });
});

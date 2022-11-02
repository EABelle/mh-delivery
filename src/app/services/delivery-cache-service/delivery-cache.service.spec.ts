import { TestBed } from '@angular/core/testing';
import { CacheService } from '../cache-service/cache.service';

import { DeliveryCacheService } from './delivery-cache.service';

describe('DeliveryCacheService', () => {
  let service: DeliveryCacheService;
  let cacheService: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryCacheService);
    cacheService = TestBed.inject(CacheService);
    cacheService.clearData();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSelectedDate', () => {
    it('should return null when no data', () => {
      expect(service.getSelectedDate()).toBeNull();
    });

    it('should return the selected date', () => {
      service.setSelectedDate('2020-01-01');
      expect(service.getSelectedDate()).toBe('2020-01-01');
    });

    it('should return the selected date when other data is saved', () => {
      service.setSelectedDate('2020-01-01');
      service.setSelectedTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
      expect(service.getSelectedDate()).toBe('2020-01-01');
    });

  });

  describe('getSelectedTime', () => {
    it('should return null when no data', () => {
      expect(service.getSelectedTime()).toBeNull();
    });

    it('should return the selected time', () => {
      service.setSelectedTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
      expect(service.getSelectedTime()).toEqual({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
    });

    it('should return the selected time when other data is saved', () => {
      service.setSelectedTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
      service.setSelectedDate('2020-01-01');
      expect(service.getSelectedTime()).toEqual({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
    });
  });

  describe('setSelectedDate', () => {
    it('should set the selected date', () => {
      service.setSelectedDate('2020-01-01');
      expect(service.getSelectedDate()).toBe('2020-01-01');
    });
  });

  describe('setSelectedTime', () => {
    it('should set the selected time', () => {
      service.setSelectedTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
      expect(service.getSelectedTime()).toEqual({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
    });
  });

  describe('removeSelectedDate', () => {
    it('should remove the selected date', () => {
      service.setSelectedDate('2020-01-01');
      service.removeSelectedDate();
      expect(service.getSelectedDate()).toBeNull();
    });
  });

  describe('removeSelectedTime', () => {
    it('should remove the selected time', () => {
      service.setSelectedTime({
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      });
      service.removeSelectedTime();
      expect(service.getSelectedTime()).toBeNull();
    });
  });

  describe('getIsHomeDelivery', () => {
    it('should return false when no data', () => {
      expect(service.getIsHomeDelivery()).toBe(false);
    });

    it('should return true when data is true', () => {
      service.setIsHomeDelivery(true);
      expect(service.getIsHomeDelivery()).toBe(true);
    });

    it('should return false when data is false', () => {
      service.setIsHomeDelivery(false);
      expect(service.getIsHomeDelivery()).toBe(false);
    });
  });

  describe('setIsHomeDelivery', () => {
    it('should set the isHomeDelivery to true', () => {
      service.setIsHomeDelivery(true);
      expect(service.getIsHomeDelivery()).toBe(true);
    });

    it('should set the isHomeDelivery to false', () => {
      service.setIsHomeDelivery(false);
      expect(service.getIsHomeDelivery()).toBe(false);
    });
  });

});

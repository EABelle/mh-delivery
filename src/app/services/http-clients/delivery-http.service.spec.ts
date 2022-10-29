import { TestBed } from '@angular/core/testing';

import { DeliveryHTTPService } from './delivery-http.service';

describe('DeliveryHTTPService', () => {
  let service: DeliveryHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

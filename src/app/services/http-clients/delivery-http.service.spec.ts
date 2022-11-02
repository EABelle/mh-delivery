import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DeliveryHTTPService } from './delivery-http.service';

describe('DeliveryHTTPService', () => {
  let service: DeliveryHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DeliveryHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

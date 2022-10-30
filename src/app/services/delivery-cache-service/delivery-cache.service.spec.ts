import { TestBed } from '@angular/core/testing';

import { DeliveryCacheService } from './delivery-cache.service';

describe('DeliveryCacheService', () => {
  let service: DeliveryCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

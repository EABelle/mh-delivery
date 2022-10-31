import { TestBed } from '@angular/core/testing';

import { DeliveryStateService } from './delivery-state.service';

describe('DeliveryStateService', () => {
  let service: DeliveryStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

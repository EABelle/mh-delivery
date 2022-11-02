import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data', () => {
    service.saveData('key', 'value');
    expect(service.getData('key')).toBe('value');
  });

  it('should remove data', () => {
    service.saveData('key', 'value');
    service.removeData('key');
    expect(service.getData('key')).toBeNull();
  });

  it('should clear data', () => {
    service.saveData('key1', 'value');
    service.saveData('key2', 'value');
    service.clearData();
    [
      service.getData('key1'),
      service.getData('key2')
    ].forEach(value => expect(value).toBeNull());
  });
});

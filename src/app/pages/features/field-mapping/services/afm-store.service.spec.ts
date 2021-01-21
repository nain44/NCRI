import { TestBed } from '@angular/core/testing';

import { AfmStoreService } from './afm-store.service';

describe('AfmStoreService', () => {
  let service: AfmStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfmStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

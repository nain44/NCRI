import { TestBed } from '@angular/core/testing';

import { AfmStoreTempService } from './afm-store-temp.service';

describe('AfmStoreTempService', () => {
  let service: AfmStoreTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfmStoreTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ClientDemographicService } from './client-demographic.service';

describe('ClientDemographicService', () => {
  let service: ClientDemographicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDemographicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

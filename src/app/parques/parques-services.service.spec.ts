import { TestBed } from '@angular/core/testing';

import { ParquesServicesService } from './parques-services.service';

describe('ParquesServicesService', () => {
  let service: ParquesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParquesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

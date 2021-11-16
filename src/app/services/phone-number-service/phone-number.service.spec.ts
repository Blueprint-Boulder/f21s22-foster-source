import { TestBed } from '@angular/core/testing';

import { PhoneNumberService } from './phone-number.service';

describe('PhoneNumberService', () => {
  let service: PhoneNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

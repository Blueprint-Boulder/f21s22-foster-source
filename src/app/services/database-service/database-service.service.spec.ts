import { TestBed } from '@angular/core/testing';

import { DatabaseServiceService } from './database-service.service';

describe('DatabaseServiceService', () => {
  let service: DatabaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

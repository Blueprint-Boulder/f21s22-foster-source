import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';

describe('DatabaseServiceService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BugService } from './bug.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BugMockService } from './bug.mock.service';

describe('BugService', () => {
  let service: BugService = new BugMockService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: BugService, useValue: service }],
    });
    service = TestBed.inject(BugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

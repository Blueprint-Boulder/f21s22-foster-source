import { TestBed } from '@angular/core/testing';

import { PureUserGuard } from './pure-user.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PureUserGuard', () => {
  let guard: PureUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(PureUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PureUserGuard } from './pure-user.guard';

describe('PureUserGuard', () => {
  let guard: PureUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PureUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

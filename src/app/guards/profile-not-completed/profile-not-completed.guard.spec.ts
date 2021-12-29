import { TestBed } from '@angular/core/testing';

import { ProfileNotCompletedGuard } from './profile-not-completed.guard';

describe('ProfileNotCompletedGuard', () => {
  let guard: ProfileNotCompletedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileNotCompletedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

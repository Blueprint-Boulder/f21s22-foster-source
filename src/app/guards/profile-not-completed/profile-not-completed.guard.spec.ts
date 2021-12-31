import { TestBed } from '@angular/core/testing';

import { ProfileNotCompletedGuard } from './profile-not-completed.guard';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('ProfileNotCompletedGuard', () => {
  let guard: ProfileNotCompletedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.inject(ProfileNotCompletedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

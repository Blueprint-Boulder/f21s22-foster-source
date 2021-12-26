import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

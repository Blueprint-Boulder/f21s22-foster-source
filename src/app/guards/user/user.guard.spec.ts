import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

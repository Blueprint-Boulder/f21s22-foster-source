import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

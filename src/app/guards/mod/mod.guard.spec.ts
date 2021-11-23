import { TestBed } from '@angular/core/testing';

import { ModGuard } from './mod.guard';

describe('ModGuard', () => {
  let guard: ModGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
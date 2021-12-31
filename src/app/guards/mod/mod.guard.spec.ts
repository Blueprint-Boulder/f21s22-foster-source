import { TestBed } from '@angular/core/testing';

import { ModGuard } from './mod.guard';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('ModGuard', () => {
  let guard: ModGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    guard = TestBed.inject(ModGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

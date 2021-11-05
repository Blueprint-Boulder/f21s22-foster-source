import { TestBed } from '@angular/core/testing';

import { ProfilePhotosService } from './profile-photos.service';

describe('ProfilePhotosService', () => {
  let service: ProfilePhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

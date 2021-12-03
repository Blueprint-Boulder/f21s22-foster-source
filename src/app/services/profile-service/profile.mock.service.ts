import { ProfileService } from './profile.service';
import { CreateProfileReq, GetProfilesRes, Profile, UpdateProfileReq } from '../../models/profile.model';
import { Observable, of } from 'rxjs';
import { profiles } from '../../mock/database-entities';
import { FiltersReq } from '../../models/filters.model';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

export class ProfileMockService implements ProfileService {
  createProfile(params: CreateProfileReq): Observable<FullProfileRes> {
    return of(profiles[0]);
  }

  getProfileById(id: number): Observable<FullProfileRes> {
    return of(profiles[0]);
  }

  getProfiles(limit: number, offset: number, filters?: FiltersReq): Observable<GetProfilesRes> {
    return of({
      profiles: profiles,
      numResults: 200,
    });
  }

  updateProfile(params: UpdateProfileReq): Observable<FullProfileRes> {
    return of(profiles[0]);
  }
}

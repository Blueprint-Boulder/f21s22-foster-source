import { ProfileService } from './profile.service';
import { CreateProfileReq, GetProfilesRes, Profile, UpdateProfileReq } from '../../models/profile.model';
import { Observable, of } from 'rxjs';
import { profiles } from '../../mock/database-entities';

export class ProfileMockService implements ProfileService {
  createProfile(params: CreateProfileReq): Observable<Profile> {
    return of(profiles[0]);
  }

  getProfileById(id: number): Observable<Profile> {
    return of(profiles[0]);
  }

  getProfiles(limit: number, offset: number): Observable<GetProfilesRes> {
    return of({
      profiles: profiles,
      numResults: profiles.length,
    });
  }

  updateProfile(params: UpdateProfileReq): Observable<Profile> {
    return of(profiles[0]);
  }
}

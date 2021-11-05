import { ProfileService } from './profile.service';
import {
  CreateProfileReq,
  GetProfilesRes,
  Profile,
  UpdateProfileReq,
} from '../../models/profile.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class ProfileImplService implements ProfileService {
  constructor(private http: HttpClient) {}

  createProfile(params: CreateProfileReq): Observable<Profile> {
    return this.http.post<Profile>(
      `${environment.backendHost}/api/db/profiles`,
      JSON.stringify(params)
    );
  }

  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(
      `${environment.backendHost}/api/db/profiles/${encodeURIComponent(id)}`
    );
  }

  getProfiles(limit: number, offset: number): Observable<GetProfilesRes> {
    const params = new HttpParams();
    params.set('limit', limit);
    params.set('offset', offset);
    return this.http.get<GetProfilesRes>(
      `${environment.backendHost}/api/db/profiles`,
      { params: params }
    );
  }

  updateProfile(params: UpdateProfileReq): Observable<Profile> {
    return this.http.put<Profile>(
      `${environment.backendHost}/api/db/profiles`,
      JSON.stringify(params)
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProfileReq, GetProfilesRes, Profile, UpdateProfileReq } from '../../models/profile.model';
import { FiltersReq } from '../../models/filters.model';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

@Injectable({
  providedIn: 'root',
})
export abstract class ProfileService {
  public abstract getProfiles(limit: number, offset: number, filters?: FiltersReq): Observable<GetProfilesRes>;
  public abstract getProfileById(id: number): Observable<FullProfileRes>;
  public abstract createProfile(params: CreateProfileReq): Observable<FullProfileRes>;
  public abstract updateProfile(params: UpdateProfileReq): Observable<FullProfileRes>;
}

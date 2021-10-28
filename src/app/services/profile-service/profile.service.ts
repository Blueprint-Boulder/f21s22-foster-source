import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateProfileReq,
  GetProfilesRes,
  Profile,
  UpdateProfileReq,
} from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProfileService {
  public abstract getProfiles(
    limit: number,
    offset: number
  ): Observable<GetProfilesRes>;
  public abstract getProfileById(id: number): Observable<Profile>;
  public abstract createProfile(params: CreateProfileReq): Observable<Profile>;
  public abstract updateProfile(params: UpdateProfileReq): Observable<Profile>;
}

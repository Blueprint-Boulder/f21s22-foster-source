import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateProfileReq,
  GetProfilesRes,
  HouseholdBackground,
  Profile,
  ProfileImages,
  UpdateHouseholdBackground,
  UpdateProfileReq,
} from '../../models/profile.model';
import { FiltersReq } from '../../models/filters.model';
import { FullProfileRes, ProfileCompletionRes } from '../../models/get-profile-by-id.models';

@Injectable({
  providedIn: 'root',
})
export abstract class ProfileService {
  public abstract getProfiles(
    limit: number,
    offset: number,
    filters?: FiltersReq,
    searchTerm?: string
  ): Observable<GetProfilesRes>;
  public abstract getProfileById(id: number): Observable<FullProfileRes>;
  public abstract createProfile(params: CreateProfileReq): Observable<FullProfileRes>;
  public abstract updateProfile(params: UpdateProfileReq): Observable<FullProfileRes>;
  public abstract currentProfileCompleted(): Observable<ProfileCompletionRes>;
  public abstract getProfileImages(): Observable<ProfileImages>;
  public abstract getCurrentProfile(): Observable<FullProfileRes>;
  public abstract updateHouseholdBackground(req: UpdateHouseholdBackground): Observable<FullProfileRes>;
}

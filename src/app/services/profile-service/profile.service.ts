import { FullProfileRes, ProfileCompletionRes, UpdateSecAccountHolderReq } from '../../models/get-profile-by-id.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateProfileReq,
  GetProfilesRes,
  HouseholdBackground,
  Profile,
  ProfileImages,
  SecondaryAccountHolderReq,
  UpdateHouseholdBackground,
  UpdateProfileReq,
} from '../../models/profile.model';
import { FiltersReq } from '../../models/filters.model';

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
  public abstract updateSecondaryAccountHolder(req: UpdateSecAccountHolderReq): Observable<FullProfileRes>;
  public abstract addSecondaryAccountHolder(req: SecondaryAccountHolderReq): Observable<FullProfileRes>;
}

import { ProfileService } from './profile.service';
import {
  CreateProfileReq,
  GetProfilesRes,
  HouseholdBackground,
  ProfileImages,
  RespiteBackgroundReq,
  RespiteProviderInfoReq,
  SecondaryAccountHolderReq,
  UpdateHouseholdBackground,
  UpdateProfileReq,
  UpdateRespiteBackgroundReq,
  UpdateRespiteProviderInfo,
} from '../../models/profile.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FiltersReq } from '../../models/filters.model';
import { AvailabilityFilters, DayAvailability, SimpleAvailability } from '../../models/availability.model';
import { FullProfileRes, ProfileCompletionRes, UpdateSecAccountHolderReq } from '../../models/get-profile-by-id.models';

export class ProfileImplService implements ProfileService {
  constructor(private http: HttpClient) {}

  createProfile(params: CreateProfileReq): Observable<FullProfileRes> {
    return this.http.post<FullProfileRes>(`${environment.backendHost}/api/db/profiles`, JSON.stringify(params), {
      withCredentials: true,
    });
  }

  getProfileById(id: number): Observable<FullProfileRes> {
    return this.http.get<FullProfileRes>(`${environment.backendHost}/api/db/profiles/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
  }

  currentProfileCompleted(): Observable<ProfileCompletionRes> {
    return this.http.get<ProfileCompletionRes>(`${environment.backendHost}/api/db/profiles/completion`, {
      withCredentials: true,
    });
  }

  getProfiles(limit: number, offset: number, filters?: FiltersReq, searchTerm?: string): Observable<GetProfilesRes> {
    let params = new HttpParams();
    params = params.set('limit', limit);
    params = params.set('offset', offset);

    if (searchTerm && searchTerm !== '') {
      params = params.set('search', searchTerm);
    }

    if (filters) {
      params = this.setFilterParams(params, filters);
    }

    return this.http.get<GetProfilesRes>(`${environment.backendHost}/api/db/profiles`, {
      params: params,
      withCredentials: true,
    });
  }

  updateProfile(params: UpdateProfileReq): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles`, params, {
      withCredentials: true,
    });
  }

  updateHouseholdBackground(req: UpdateHouseholdBackground): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles/household-background`, req, {
      withCredentials: true,
    });
  }

  updateSecondaryAccountHolder(req: UpdateSecAccountHolderReq): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles/secondary-account-holder`, req, {
      withCredentials: true,
    });
  }

  addSecondaryAccountHolder(req: SecondaryAccountHolderReq): Observable<FullProfileRes> {
    return this.http.post<FullProfileRes>(`${environment.backendHost}/api/db/profiles/secondary-account-holder`, req, {
      withCredentials: true,
    });
  }

  addRespiteProviderInfo(req: RespiteProviderInfoReq): Observable<FullProfileRes> {
    return this.http.post<FullProfileRes>(`${environment.backendHost}/api/db/profiles/respite-provider-info`, req, {
      withCredentials: true,
    });
  }

  updateRespiteBackground(req: UpdateRespiteBackgroundReq): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles/respite-background`, req, {
      withCredentials: true,
    });
  }

  updateRespiteProviderInfo(req: UpdateRespiteProviderInfo): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles/respite-provider-info`, req, {
      withCredentials: true,
    });
  }

  //TODO: Move this to availability service
  updatePrimaryAvailability(req: SimpleAvailability): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles/availability?type=PRIMARY`, req, {
      withCredentials: true,
    });
  }

  getProfileImages(): Observable<ProfileImages> {
    return this.http.get<ProfileImages>(`${environment.backendHost}/api/db/profiles/profile-images`, {
      withCredentials: true,
    });
  }

  getCurrentProfile(): Observable<FullProfileRes> {
    return this.http.get<FullProfileRes>(`${environment.backendHost}/api/db/profiles/current`, {
      withCredentials: true,
    });
  }

  private setFilterParams(params: HttpParams, filters: FiltersReq): HttpParams {
    const filtersWNoUndefined = JSON.parse(JSON.stringify(filters));
    let p: HttpParams = params;
    const filterKeys: string[] = [];
    const filterValues: (string | number | boolean)[] = [];
    Object.keys(filtersWNoUndefined).forEach((key: string) => {
      filterKeys.push(key);
    });
    Object.values(filtersWNoUndefined).forEach((val: any) => {
      filterValues.push(
        typeof val === 'boolean' || typeof val === 'number' ? val : val.toString ? val.toString() : val
      );
    });
    for (let i = 0; i < filterKeys.length; i++) {
      if (filterKeys[i] === 'availabilities') {
        p = this.setAvailabilityParams(p, filters.availabilities as AvailabilityFilters);
      } else {
        p = p.set(filterKeys[i], filterValues[i]);
      }
    }
    return p;
  }

  private setAvailabilityParams(params: HttpParams, availabilities: AvailabilityFilters) {
    let p = params;
    const toFilter: string[] = [];
    const vals: DayAvailability[] = [];
    const days: string[] = [];
    Object.values(availabilities).forEach((avail: DayAvailability) => {
      vals.push(avail);
    });
    Object.keys(availabilities).forEach((key) => {
      days.push(key);
    });
    days.forEach((day: string, index: number) => {
      if (vals[index].some((x: boolean) => x)) {
        p = p.set(day + 'Availability', vals[index].toString());
      }
    });
    return p;
  }
}

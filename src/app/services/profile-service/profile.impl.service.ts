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
import { FiltersReq } from '../../models/filters.model';
import { tap } from 'rxjs/operators';
import {
  AvailabilityFilters,
  DayAvailability,
} from '../../models/availability.model';

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

  getProfiles(
    limit: number,
    offset: number,
    filters?: FiltersReq
  ): Observable<GetProfilesRes> {
    let params = new HttpParams();
    params = params.set('limit', limit);
    params = params.set('offset', offset);

    if (filters) {
      params = this.setFilterParams(params, filters);
    }

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
        typeof val === 'boolean' || typeof val === 'number'
          ? val
          : val.toString
          ? val.toString()
          : val
      );
    });
    for (let i = 0; i < filterKeys.length; i++) {
      if (filterKeys[i] === 'availabilities') {
        p = this.setAvailabilityParams(
          p,
          filters.availabilities as AvailabilityFilters
        );
      } else {
        p = p.set(filterKeys[i], filterValues[i]);
      }
    }
    return p;
  }

  private setAvailabilityParams(
    params: HttpParams,
    availabilities: AvailabilityFilters
  ) {
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

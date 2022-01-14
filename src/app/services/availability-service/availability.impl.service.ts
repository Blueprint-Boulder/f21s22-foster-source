import { AvailabilityService } from './availability.service';
import { HttpClient } from '@angular/common/http';
import { Availability, SimpleAvailability } from '../../models/availability.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

export class AvailabilityImplService implements AvailabilityService {
  constructor(private http: HttpClient) {}

  addTemporaryAvailability(req: SimpleAvailability): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(
      `${environment.backendHost}/api/db/profiles/availability?type=TEMPORARY`,
      req,
      {
        withCredentials: true,
      }
    );
  }

  removeTemporaryAvailability(): Observable<any> {
    return this.http.delete<any>(`${environment.backendHost}/api/db/profiles/availability?type=TEMPORARY`, {
      withCredentials: true,
    });
  }

  createAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(
      `${environment.backendHost}/api/db/availability`,
      JSON.stringify(availability),
      { withCredentials: true }
    );
  }

  deleteAvailability(id: number): Observable<Availability> {
    return this.http.delete<Availability>(`${environment.backendHost}/api/db/availability/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
  }

  getAvailabilityByProfileId(id: number): Observable<Availability> {
    return this.http.get<Availability>(`${environment.backendHost}/api/db/availability/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
  }

  updateAvailability(availability: Availability): Observable<Availability> {
    return this.http.put<Availability>(
      `${environment.backendHost}/api/db/availability/${encodeURIComponent(availability.id)}`,
      JSON.stringify(availability),
      { withCredentials: true }
    );
  }
}

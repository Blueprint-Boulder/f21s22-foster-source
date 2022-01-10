import { AvailabilityService } from './availability.service';
import { HttpClient } from '@angular/common/http';
import { Availability } from '../../models/availability.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class AvailabilityImplService implements AvailabilityService {
  constructor(private http: HttpClient) {}

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

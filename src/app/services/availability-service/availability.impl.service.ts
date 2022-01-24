import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { SimpleAvailability } from '../../models/availability.model';
import { environment } from '../../../environments/environment';
import { AvailabilityService } from './availability.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  updatePrimaryAvailability(req: SimpleAvailability): Observable<FullProfileRes> {
    return this.http.put<FullProfileRes>(`${environment.backendHost}/api/db/profiles/availability?type=PRIMARY`, req, {
      withCredentials: true,
    });
  }
}

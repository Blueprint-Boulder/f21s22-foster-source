import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { SimpleAvailability } from '../../models/availability.model';
import { AvailabilityService } from './availability.service';
import { profiles } from '../../mock/database-entities';
import { Observable, of } from 'rxjs';

export class AvailabilityMockService implements AvailabilityService {
  addTemporaryAvailability(req: SimpleAvailability): Observable<FullProfileRes> {
    return of(profiles[0]);
  }

  removeTemporaryAvailability(): Observable<any> {
    return of({});
  }

  updatePrimaryAvailability(req: SimpleAvailability): Observable<FullProfileRes> {
    return of(profiles[0]);
  }
}

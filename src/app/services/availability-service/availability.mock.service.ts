import { AvailabilityService } from './availability.service';
import { Availability, SimpleAvailability } from '../../models/availability.model';
import { Observable, of } from 'rxjs';
import { primaryAvailabilities, profiles, temporaryAvailabilities } from '../../mock/database-entities';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

export class AvailabilityMockService implements AvailabilityService {
  createAvailability(availability: Availability): Observable<Availability> {
    return of(primaryAvailabilities[0]);
  }

  deleteAvailability(id: number): Observable<Availability> {
    return of(primaryAvailabilities[0]);
  }

  getAvailabilityByProfileId(id: number): Observable<Availability> {
    return of(primaryAvailabilities[0]);
  }

  updateAvailability(availability: Availability): Observable<Availability> {
    return of(primaryAvailabilities[0]);
  }

  addTemporaryAvailability(req: SimpleAvailability): Observable<FullProfileRes> {
    return of(profiles[0]);
  }

  removeTemporaryAvailability(): Observable<any> {
    return of({});
  }
}

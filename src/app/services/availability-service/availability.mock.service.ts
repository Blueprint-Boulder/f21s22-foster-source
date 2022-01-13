import { AvailabilityService } from './availability.service';
import { Availability, SimpleAvailability } from '../../models/availability.model';
import { Observable, of } from 'rxjs';
import { primaryAvailabilities, temporaryAvailabilities } from '../../mock/database-entities';

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

  addTemporaryAvailability(req: SimpleAvailability): Observable<SimpleAvailability> {
    return of(temporaryAvailabilities[0]);
  }

  removeTemporaryAvailability(): Observable<any> {
    return of({});
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleAvailability } from '../../models/availability.model';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

@Injectable({
  providedIn: 'root',
})
export abstract class AvailabilityService {
  public abstract removeTemporaryAvailability(): Observable<any>;
  public abstract addTemporaryAvailability(req: SimpleAvailability): Observable<FullProfileRes>;
  public abstract updatePrimaryAvailability(req: SimpleAvailability): Observable<FullProfileRes>;
}

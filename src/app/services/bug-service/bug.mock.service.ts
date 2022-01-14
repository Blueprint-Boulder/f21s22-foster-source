import { BugReport, BugReportReq, GetBugsRes } from '../../models/bug.model';
import { BugService } from './bug.service';
import { Observable, of } from 'rxjs';
import { bugs } from '../../mock/database-entities';

export class BugMockService implements BugService {
  postBug(req: BugReportReq): Observable<BugReport> {
    return of(bugs[0]);
  }
  getBugs(): Observable<GetBugsRes> {
    return of({ bugs: bugs });
  }
  deleteBug(id: number): Observable<BugReport> {
    return of(bugs[0]);
  }
}

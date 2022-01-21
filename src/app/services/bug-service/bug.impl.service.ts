import { environment } from '../../../environments/environment';
import { BugReport, GetBugsRes } from '../../models/bug.model';
import { HttpClient } from '@angular/common/http';
import { BugService } from './bug.service';
import { Observable } from 'rxjs';

export class BugImplService implements BugService {
  constructor(private http: HttpClient) {}
  postBug(req: BugReport): Observable<BugReport> {
    return this.http.post<BugReport>(`${environment.backendHost}/api/db/bugs`, req, {
      withCredentials: true,
    });
  }
  getBugs(): Observable<GetBugsRes> {
    return this.http.get<GetBugsRes>(`${environment.backendHost}/api/db/bugs`, {
      withCredentials: true,
    });
  }
  deleteBug(id: number): Observable<BugReport> {
    return this.http.delete<BugReport>(`${environment.backendHost}/api/db/bugs/${id}`, {
      withCredentials: true,
    });
  }
}

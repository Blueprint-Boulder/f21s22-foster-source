import { BugReport, BugReportReq, GetBugsRes } from '../../models/bug.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BugService {
  public abstract postBug(req: BugReportReq): Observable<BugReport>;
  public abstract getBugs(): Observable<GetBugsRes>;
  public abstract deleteBug(id: number): Observable<BugReport>;
}

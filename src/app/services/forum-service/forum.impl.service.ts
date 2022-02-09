import { CreateTopicReq, GetTopicSummariesRes, Topic, TopicSummary, UpdateTopicReq } from '../../models/forum.models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ForumService } from './forum.service';
import { Observable } from 'rxjs';

export class ForumImplService implements ForumService {
  constructor(private http: HttpClient) {}

  getTopicSummaryById(id: number): Observable<TopicSummary> {
    return this.http.get<TopicSummary>(`${environment.backendHost}/api/db/topics/${id}?summary=true`, {
      withCredentials: true,
    });
  }

  getTopicSummaries(): Observable<GetTopicSummariesRes> {
    return this.http.get<GetTopicSummariesRes>(`${environment.backendHost}/api/db/topics?summary=true`, {
      withCredentials: true,
    });
  }

  createTopic(req: CreateTopicReq): Observable<Topic> {
    return this.http.post<Topic>(`${environment.backendHost}/api/db/forum/topics`, req, { withCredentials: true });
  }

  updateTopic(req: UpdateTopicReq): Observable<Topic> {
    return this.http.put<Topic>(`${environment.backendHost}/api/db/forum/topics/${req.id}`, req, {
      withCredentials: true,
    });
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendHost}/api/db/forum/topics/${id}`, { withCredentials: true });
  }
}

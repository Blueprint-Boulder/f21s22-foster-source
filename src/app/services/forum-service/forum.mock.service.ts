import { CreateTopicReq, GetTopicSummariesRes, Topic, TopicSummary, UpdateTopicReq } from '../../models/forum.models';
import { topics, topicSummaries } from '../../mock/database-entities';
import { ForumService } from './forum.service';
import { Observable, of } from 'rxjs';

export class ForumMockService implements ForumService {
  createTopic(req: CreateTopicReq): Observable<Topic> {
    return of(topics[0]);
  }

  deleteTopic(id: number): Observable<any> {
    return of({});
  }

  getTopicSummaries(): Observable<GetTopicSummariesRes> {
    return of({
      topics: topicSummaries,
    });
  }

  getTopicSummaryById(id: number): Observable<TopicSummary> {
    return of(topicSummaries[0]);
  }

  updateTopic(req: UpdateTopicReq): Observable<Topic> {
    return of(topics[0]);
  }
}

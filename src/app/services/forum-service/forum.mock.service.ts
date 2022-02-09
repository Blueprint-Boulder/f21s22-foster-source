import {
  CreateNewThreadReq,
  CreateTopicReq,
  FullThread,
  GetThreadSummariesRes,
  GetTopicSummariesRes,
  ThreadSummary,
  Topic,
  TopicSummary,
  UpdateThreadReq,
  UpdateTopicReq,
} from '../../models/forum.models';
import { fullThreads, threadSummaries, topics, topicSummaries } from '../../mock/database-entities';
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

  createNewThread(req: CreateNewThreadReq): Observable<ThreadSummary> {
    return of(threadSummaries[0]);
  }

  deleteThread(id: number): Observable<any> {
    return of({});
  }

  getAllThreads(limit: number, offset: number): Observable<GetThreadSummariesRes> {
    return of({
      threads: threadSummaries,
    });
  }

  getThreadById(id: number): Observable<ThreadSummary> {
    return of(threadSummaries[1]);
  }

  getThreadByIdWithReplies(id: number, replyLimit: number, replyOffset: number): Observable<FullThread> {
    return of(fullThreads[id % fullThreads.length]);
  }

  getThreadsForTopic(topicId: number, limit: number, offset: number): Observable<GetThreadSummariesRes> {
    return of({
      threads: threadSummaries,
    });
  }

  likeThread(id: number): Observable<any> {
    return of();
  }

  unlikeThread(id: number): Observable<any> {
    return of();
  }

  updateThread(req: UpdateThreadReq): Observable<ThreadSummary> {
    return of(threadSummaries[1]);
  }
}

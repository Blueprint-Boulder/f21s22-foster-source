import {
  CreateNewThreadReq,
  CreateTopicReq,
  DeleteThreadReq,
  ForumStats,
  FullThread,
  GetReplyReportsRes,
  GetThreadReportsRes,
  GetThreadSummariesRes,
  GetThreadSummariesWCount,
  GetTopicSummariesRes,
  ModRemoveReplyReq,
  ModRemoveThreadReq,
  PostReplyReq,
  Reply,
  ReportReplyReq,
  ReportThreadReq,
  ThreadSummary,
  Topic,
  TopicSummary,
  UpdateReplyReq,
  UpdateThreadReq,
  UpdateTopicReq,
} from '../../models/forum.models';
import {
  forumStats,
  fullThreads,
  replies,
  replyReports,
  threadReports,
  threadSummaries,
  topics,
  topicSummaries,
} from '../../mock/database-entities';
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

  modRemoveThread(req: ModRemoveThreadReq): Observable<any> {
    return of({});
  }

  removeOwnThread(id: number): Observable<any> {
    return of({});
  }

  getAllThreads(limit: number, offset: number): Observable<GetThreadSummariesRes> {
    return of({
      threads: threadSummaries,
      totalResults: 200,
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
      totalResults: 200,
    });
  }

  likeThread(id: number): Observable<any> {
    return of({});
  }

  unlikeThread(id: number): Observable<any> {
    return of({});
  }

  likeReply(threadId: number, replyId: number): Observable<any> {
    return of({});
  }

  unlikeReply(threadId: number, replyId: number): Observable<any> {
    return of({});
  }

  updateThread(req: UpdateThreadReq): Observable<ThreadSummary> {
    return of(threadSummaries[1]);
  }

  deleteReply(threadId: number, replyId: number): Observable<any> {
    return of();
  }

  getReplyById(replyId: number): Observable<Reply> {
    return of(replies[replyId % replies.length]);
  }

  postReply(req: PostReplyReq): Observable<Reply> {
    return of(replies[0]);
  }

  updateReply(req: UpdateReplyReq): Observable<Reply> {
    return of(replies[req.replyId % replies.length]);
  }

  reportThread(req: ReportThreadReq): Observable<any> {
    return of({});
  }

  reportReply(req: ReportReplyReq): Observable<any> {
    return of({});
  }

  modRemoveReply(req: ModRemoveReplyReq): Observable<any> {
    return of({});
  }

  getThreadReports(): Observable<GetThreadReportsRes> {
    return of({
      threadReports: threadReports,
    });
  }

  deleteThreadReport(id: number): Observable<any> {
    return of({});
  }

  getReplyReports(): Observable<GetReplyReportsRes> {
    return of({ replyReports: replyReports });
  }

  deleteReplyReport(id: number): Observable<any> {
    return of({});
  }

  getLatestThreadsForAccount(id: number, count: number): Observable<GetThreadSummariesWCount> {
    return of({ threads: threadSummaries, totalResults: threadSummaries.length });
  }

  getStatsForAccount(id: number): Observable<ForumStats> {
    return of(forumStats[0]);
  }
}

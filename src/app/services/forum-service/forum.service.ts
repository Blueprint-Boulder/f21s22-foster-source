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
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ForumService {
  /**
   * TOPICS
   */
  public abstract getTopicSummaryById(id: number): Observable<TopicSummary>;
  public abstract getTopicSummaries(): Observable<GetTopicSummariesRes>;
  public abstract createTopic(req: CreateTopicReq): Observable<Topic>;
  public abstract updateTopic(req: UpdateTopicReq): Observable<Topic>;
  public abstract deleteTopic(id: number): Observable<any>;

  /**
   * THREADS
   */
  public abstract getAllThreads(limit: number, offset: number): Observable<GetThreadSummariesRes>;
  public abstract getThreadsForTopic(topicId: number, limit: number, offset: number): Observable<GetThreadSummariesRes>;
  public abstract getThreadById(id: number): Observable<ThreadSummary>;
  public abstract getThreadByIdWithReplies(id: number, replyLimit: number, replyOffset: number): Observable<FullThread>;
  public abstract createNewThread(req: CreateNewThreadReq): Observable<ThreadSummary>;
  public abstract updateThread(req: UpdateThreadReq): Observable<ThreadSummary>;
  public abstract modRemoveThread(req: ModRemoveThreadReq): Observable<any>;
  public abstract removeOwnThread(id: number): Observable<any>;
  public abstract likeThread(id: number): Observable<any>;
  public abstract unlikeThread(id: number): Observable<any>;
  public abstract reportThread(req: ReportThreadReq): Observable<any>;
  public abstract getLatestThreadsForAccount(id: number, count: number): Observable<GetThreadSummariesWCount>;

  /**
   * REPLIES
   */
  public abstract postReply(req: PostReplyReq): Observable<Reply>;
  public abstract updateReply(req: UpdateReplyReq): Observable<Reply>;
  public abstract deleteReply(threadId: number, replyId: number): Observable<any>;
  public abstract getReplyById(replyId: number): Observable<Reply>;
  public abstract likeReply(threadId: number, replyId: number): Observable<any>;
  public abstract unlikeReply(threadId: number, replyId: number): Observable<any>;
  public abstract reportReply(req: ReportReplyReq): Observable<any>;
  public abstract modRemoveReply(req: ModRemoveReplyReq): Observable<any>;

  /**
   * Thread Reports
   */
  public abstract getThreadReports(): Observable<GetThreadReportsRes>;
  public abstract getReplyReports(): Observable<GetReplyReportsRes>;
  public abstract deleteThreadReport(id: number): Observable<any>;
  public abstract deleteReplyReport(id: number): Observable<any>;

  public abstract getStatsForAccount(id: number): Observable<ForumStats>;
}

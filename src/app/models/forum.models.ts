export interface Topic {
  id: number;
  title: string;
  description: string;
}

export interface CreateTopicReq {
  title: string;
  description: string;
}

export interface UpdateTopicReq {
  id: number;
  title?: string;
  description?: string;
}

export interface TopicSummary {
  id: number;
  description: string;
  title: string;
  threadCount: number;
  lastPostDate: Date;
}

export interface GetTopicSummariesRes {
  topics: TopicSummary[];
}

export interface ThreadSummary {
  id: number;
  likes: number;
  title: string;
  body: string;
  createdAt: Date;
  replyCount: number;
  lastReplyDate: Date;
  topicTitle: string;
  edited: boolean;
  requesterHasLiked: boolean;
  account: {
    id: number;
    username: string;
    privilege: string;
    profileId?: number;
    profileSmallAwsKey?: string;
  };
}

export interface GetThreadSummariesRes {
  threads: ThreadSummary[];
  totalResults: number;
}

export interface GetThreadSummariesWCount {
  threads: ThreadSummary[];
  totalResults: number;
}

export interface Reply {
  id: number;
  body: string;
  likes: number;
  replyingToText?: string;
  replyingToUsername?: string;
  edited: boolean;
  requesterHasLiked: boolean;
  createdAt: Date;
  threadId: number;
  account: {
    id: number;
    username: string;
    privilege: string;
    profileId?: number;
    profileSmallAwsKey: string;
  };
}

export interface FullThread {
  id: number;
  likes: number;
  title: string;
  body: string;
  edited: boolean;
  createdAt: Date;
  replyCount: number;
  lastReplyDate: Date;
  topicTitle: string;
  topicId: number;
  requesterHasLiked: boolean;
  account: {
    id: number;
    username: string;
    privilege: string;
    profileId?: number;
  };
  replies: Reply[];
}

export interface CreateNewThreadReq {
  topicId: number;
  title: string;
  body: string;
}

export interface UpdateThreadReq {
  id: number;
  title?: string;
  body?: string;
}

export interface DeleteThreadReq {
  id: number;
  reason?: string;
}

export interface PostReplyReq {
  threadId: number;
  body: string;
  replyingToText?: string;
  replyingToUsername?: string;
}

export interface UpdateReplyReq {
  threadId: number;
  replyId: number;
  body?: string;
}

export interface ReportThreadReq {
  id: number;
  description: string;
}

export interface ReportReplyReq {
  threadId: number;
  replyId: number;
  description: string;
}

export interface ModRemoveThreadReq {
  id: number;
  reason: string;
  shouldBlacklist?: boolean; // takes priority over suspension if both are provided
  shouldSuspend?: boolean;
  suspendForDays?: number;
}

export interface ModRemoveReplyReq {
  threadId: number;
  replyId: number;
  reason: string;
  shouldBlacklist?: boolean; // takes priority over suspension if both are provided
  shouldSuspend?: boolean;
  suspendForDays?: number;
}

export interface ThreadReport {
  id: number;
  description: string;
  threadId: number;
  threadTitle: string;
  createdAt: Date;
  account: {
    id: number;
    username: string;
  };
}

export interface GetThreadReportsRes {
  threadReports: ThreadReport[];
}

export interface ReplyReport {
  id: number;
  description: string;
  threadId: number;
  replyId: string;
  replyBody: string;
  createdAt: Date;
  account: {
    id: number;
    username: string;
  };
}

export interface GetReplyReportsRes {
  replyReports: ReplyReport[];
}

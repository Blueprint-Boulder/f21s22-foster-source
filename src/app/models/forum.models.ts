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
  account: {
    id: number;
    username: string;
    privilege: string;
    profileId?: number;
  };
}

export interface GetThreadSummariesRes {
  threads: ThreadSummary[];
}

export interface Reply {
  id: number;
  body: string;
  likes: number;
  replyingToText?: string;
  replyingToUsername?: string;
  edited: boolean;
  account: {
    id: number;
    username: string;
    privilege: string;
    profileId?: number;
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

export interface ModRemoveThreadReq {
  id: number;
  reason: string;
  shouldBlacklist?: boolean; // takes priority over suspension if both are provided
  shouldSuspend?: boolean;
  suspendForDays?: number;
}

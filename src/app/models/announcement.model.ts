export interface Announcement {
  id: number;
  date: Date;
  author: string;
  title: string;
  bodyHTML: string;
}

export interface PostAnnouncementRequest {
  bodyHtml: string;
}

export interface PostAnnouncementResponse {
  error?: string;
}

export interface DeleteAnnouncementRequest {
  id: number;
}

export interface DeleteAnnouncementResponse {
  error?: string;
}

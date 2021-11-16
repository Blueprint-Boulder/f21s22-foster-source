export interface Announcement {
  id: number;
  date: Date;
  author: string;
  title: string;
  bodyHTML: string;
}

export interface OptionalAnnouncement {
  id: number;
  date?: Date;
  author?: string;
  title?: string;
  bodyHtml?: string;
}

export interface GetAnnouncementsRes {
  announcements: Announcement[];
}

export interface PostAnnouncementRequest {
  title: string;
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

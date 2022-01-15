export interface BugReportReq {
  description: string;
  environment: string;
  url?: string;
  stepsToReproduce?: string;
}
export interface BugReport {
  id: number;
  description: string;
  environment: string;
  url?: string;
  stepsToReproduce?: string;
  createdAt: Date;
}

export interface GetBugsRes {
  bugs: BugReport[];
}

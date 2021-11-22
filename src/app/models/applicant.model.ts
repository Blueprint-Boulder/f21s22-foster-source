export interface Applicant {
  id: number;
  name: string;
  email: string;
  caseWorkerName: string;
  caseWorkerEmail: string;
  dateApplied: Date;
}

export interface GetApplicantsRes {
  applicants: Applicant[];
}

export interface ApprovalTableUser extends Applicant {
  isCollapsed: boolean;
}

export interface DenyApplicantRequest {
  id: number;
  reason: string;
  shouldNotifyApplicant: boolean;
  shouldBlacklist: boolean;
}

export interface DenyApplicantResponse {
  error?: string;
}

export interface ApproveApplicantRequest {
  id: number;
}

export interface ApproveApplicantResponse {
  error?: string;
}

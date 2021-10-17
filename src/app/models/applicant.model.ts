export interface Applicant {
  name: string;
  email: string;
  caseWorkerName: string;
  caseWorkerEmail: string;
  dateApplied: Date;
}

export interface ApprovalTableUser extends Applicant {
  isCollapsed: boolean;
}

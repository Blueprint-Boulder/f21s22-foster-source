import { Account } from './account.model';
import { FormGroup } from '@angular/forms';

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

export interface ApprovalTableUser extends Account {
  isCollapsed: boolean;
  index: number;
  denyForm: FormGroup;
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

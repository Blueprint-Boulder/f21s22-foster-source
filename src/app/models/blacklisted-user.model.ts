export interface BlacklistedUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: Date;
  reason: string;
  bannedByAccount: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface GetBlacklistedUsersRes {
  blacklist: BlacklistedUser[];
}

export interface RemoveFromBlacklistRequest {
  email: string;
  phone: string;
}

export interface RemoveFromBlacklistResponse {
  error?: string;
}

export interface SuspendUserReq {
  accountId: number;
  suspendForDays: number;
  reason: string;
}

export interface BlacklistAccountReq {
  accountId: number;
  reason: string;
}

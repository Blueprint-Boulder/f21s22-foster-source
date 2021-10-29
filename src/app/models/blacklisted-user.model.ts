export interface BlacklistedUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: Date;
  bannedBy: string;
  reason: string;
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

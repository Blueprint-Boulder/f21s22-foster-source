export interface ChangePasswordReq {
  oldPassword: string;
  newPassword: string;
}

export interface RecoveryChangePasswordReq {
  email: string;
  password: string;
  key: string;
}

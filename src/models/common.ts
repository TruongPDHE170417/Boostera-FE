export interface AccountInfo {
  userId: string | null
  username: string | null
  gmail: string | null
  picture: string | null
  role: ROLE_ACCOUNT | null
}

export interface AuthInfo {
  accessToken: string | null
  refreshToken: string | null
}

export enum ROLE_ACCOUNT {
  STUDENT = 1,
  STAFF = 2,
}

export interface BoosterRequest {
  _id: string | null
  nickname: string | null
  discordUsername: string | null
  gameName: string | null
  tagLine: string | null
  about: string | null
  country: string | null
  email: string | null
  status: REQUEST_STATUS | null
}

export enum REQUEST_STATUS {
  SUBMITTED = "submitted",
  APPROVED = "approved",
  REJECTED = "rejected",
}

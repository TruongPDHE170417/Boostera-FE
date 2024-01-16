export const API_ENDPOINT = "http://localhost:3001"

export interface Response<T> {
  success: boolean
  data: T | null
  message?: string
  errorCode?: number
}

export type Report = {
  _id: string
  status: REPORT_STATUS
  messageReport: string
  messageRejected?: string
  boosterId: string
  jobId: string
  managerId: string
}

export enum REPORT_STATUS {
  PENDING = 0,
  RESOLVED,
  REJECTED
}

export const REPORT_STATUS_LABEL = ['Pending', 'Resolved', 'Rejected']
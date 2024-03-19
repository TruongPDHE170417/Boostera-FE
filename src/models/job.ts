import { Booster } from "./booster"
import { Payment } from "./payment"
import { User } from "./user"

enum STATUS_JOB {
 IN_PROGRESS = 'In Progress',
 COMPLETED = 'COMPLETED',
 WITHDRAWN = 'WITHDRAWN',
 CANCELED = 'CANCELED',
}

export type Job = {
  _id: string
  customerID: string
  fromLeague: string
  fromDivision: string
  fromLp: string
  toLeague: string
  toDivision: string
  status: STATUS_JOB
  priority: number,
  boosterId: Booster
  managerId: User,
  createdAt: string,
  updatedAt: string
}

export type Service = {
  _id: string
  name: string
  value: string
}


export type JobDetail = {
  _id: string
  jobID: Job
  paymentId: Payment
  currentLeague: string
  currentDivision: string
  extraService: [Service]
}
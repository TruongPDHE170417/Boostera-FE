import { FEEDBACK_STATUS } from "src/models/feedback"

export const getFeedbackStatus = (status: FEEDBACK_STATUS) => {
  switch (status) {
    case FEEDBACK_STATUS.PENDING:
      return <p className="rounded-3xl bg-violet-400 px-3 py-1">Pending</p>
    case FEEDBACK_STATUS.REJECTED:
      return <p className="rounded-3xl bg-red-400 px-3 py-1">Rejected</p>
    case FEEDBACK_STATUS.APPROVE:
      return <p className="rounded-3xl bg-yellow-400 px-3 py-1">Approve</p>
    case FEEDBACK_STATUS.DONE:
      return <p className="rounded-3xl bg-green-400 px-3 py-1">Done</p>
    default:
      return null
  }
}

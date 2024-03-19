import React from 'react'
import { REPORT_STATUS, REPORT_STATUS_LABEL } from '@models/report'

type Props = {
  status: REPORT_STATUS
}

const ReportStatus = ({ status }: Props) => {
  return (
    <div className={`badge ${status === REPORT_STATUS.PENDING ? 'badge-info' : status === REPORT_STATUS.RESOLVED ? 'badge-success' : 'badge-error'} text-white font-semibold`}>{REPORT_STATUS_LABEL[status]}</div>
  )
}

export default ReportStatus
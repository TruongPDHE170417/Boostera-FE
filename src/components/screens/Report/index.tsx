import React, { ChangeEvent, useEffect, useState } from 'react'
import { API_ENDPOINT, Response } from '@models/api'
import { REPORT_STATUS, REPORT_STATUS_LABEL, Report } from '@models/report'
import ReportStatus from './components/ReportStatus'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { formatId } from '@utils/formatId'
import Icon from '@components/icons'
import EditReportModal from './components/EditReportModal'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useRouter } from 'next/router'

const ReportScreen = () => {
  const route = useRouter()

  const [reports, setReports] = useState<Report[]>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [messageReject, setMessageReject] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [status, setStatus] = useState<REPORT_STATUS>()
  const [selectedReport, setSelectedReport] = useState<Report>()
  const [isRefetchReports, setIsRefetchReports] = useState<boolean>(false)

  const handleChangeOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const handleSelectReport = (report: Report) => {
    setIsOpenModal(true)
    setStatus(report.status)
    setSelectedReport(report)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setMessageReject('')
    setErrorMessage('')
  }

  const handleChangeMessageReject = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageReject(e.target.value)
    if (!e.target.value) {
      setErrorMessage('Reject Message is require!')
    } else {
      setErrorMessage('')
    }
  }

  const handleChangeStatus = (status: REPORT_STATUS) => {
    setStatus(status)
  }

  const handleUpdateReport = async () => {
    const response = await await fetch(API_ENDPOINT + '/report/update', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedReport?._id,
        status,
        messageReject,
      }),
    })
    const data = await response.json()
    if (data) {
      notify(NOTIFICATION_TYPE.SUCCESS, 'Update report successfully!')
      setIsRefetchReports(!isRefetchReports)
    } else {
      notify(NOTIFICATION_TYPE.ERROR, 'Something wrong when update report, try again!')
    }
    handleCloseModal()
  }

  const handleViewReport = (jobId: string) => {
    route.push(`/job-detail/${jobId}`)
  }

  useEffect(() => {
    const handleGetReports = async () => {
      const response = await fetch(API_ENDPOINT + '/report')
      const data = await response.json() as Report[]
      if (!!data.length) {
        setReports(data)
      }
    }
    handleGetReports()
  }, [isRefetchReports])

  return (
    <>
      <EditReportModal
        isOpenModal={isOpenModal}
        status={status ?? REPORT_STATUS.PENDING}
        errorMessage={errorMessage}
        messageReject={messageReject}
        handleChangeOpenModal={handleChangeOpenModal}
        handleChangeMessageReject={handleChangeMessageReject}
        handleChangeStatus={handleChangeStatus}
        onClose={handleCloseModal}
        onConfirm={handleUpdateReport}
      />
      <div className="min-h-screen bg-theme text-white px-20 py-20">
        <p className="text-4xl font-semibold text-white text-center">Management Report</p>
        <div className="my-8">
          <Table aria-label="Example static collection table" classNames={{ wrapper: "bg-primary" }}>
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>JobID</TableColumn>
              <TableColumn>Booster</TableColumn>
              <TableColumn>Report Message</TableColumn>
              <TableColumn>Rejected Message</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No now">
              {reports?.length ? reports?.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Tooltip content={item._id}>
                      <span>{formatId(item._id)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip content={item.jobId}>
                      <span>{formatId(item.jobId)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip content={item.boosterId}>
                      <span>{formatId(item.boosterId)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{item.messageReport}</TableCell>
                  <TableCell>{item.messageRejected}</TableCell>
                  <TableCell>
                    <ReportStatus status={item.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Tooltip content="View Job Report">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleViewReport(item.jobId)}>
                          <Icon name="eye" />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit Report">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleSelectReport(item)}>
                          <Icon name="pencil" />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              )) : <TableRow>
                <TableCell>''</TableCell>
                <TableCell>''</TableCell>
                <TableCell>''</TableCell>
                <TableCell>''</TableCell>
                <TableCell>''</TableCell>
                <TableCell>''</TableCell>
                <TableCell>''</TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </div>
      </div >
    </>
  )
}

export default ReportScreen
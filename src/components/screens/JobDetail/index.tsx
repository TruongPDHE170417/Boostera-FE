import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@nextui-org/react'
import Icon from '@components/icons'
import Copy from '@components/common/Copy'
import { API_ENDPOINT, Response } from '@models/api'
import { JobDetail } from '@models/job'
import { formatCurrency } from '@utils/formatCurrency'
import ReportModal from './components/ReportModal'
import { Report } from '@models/report'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { IMGUR_CLIENT_ID } from '@constants/imgur'

type Props = {
  jobId: string
}

const JobDetailScreen = ({ jobId }: Props) => {
  const route = useRouter()

  const [job, setJob] = useState<JobDetail>()
  const [reportMessage, setReportMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [report, setReport] = useState<Report>()

  const handleChangeOpenModal = () => {
    if (!report) {
      setIsOpenModal(!isOpenModal)
    } else {
      route.push(`/report-detail/${report._id}`)
    }
  }

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setReportMessage(e.target.value)
    if (e.target.value) {
      setErrorMessage('')
    } else {
      setErrorMessage('Report message is require!')
    }
  }

  const handleSendReport = async () => {
    if (reportMessage) {
      const response = await fetch(API_ENDPOINT + "/report/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job?._id,
          messageReport: reportMessage,
          boosterId: job?.jobID?.boosterId,
          managerId: job?.jobID?.managerId?._id,
        }),
      })
      const data = await response.json() as Response<Report>
      if (data.success) {
        notify(NOTIFICATION_TYPE.SUCCESS, `Report booster ${job?.jobID?.boosterId?.nickname} successfully`)
      } else {
        notify(NOTIFICATION_TYPE.ERROR, data.message ? data.message : "Something wrong when report, try again!")
      }
      setIsOpenModal(false)
      setReportMessage('')
    } else {
      setErrorMessage('Report message is missing!')
    }
  }

  const handleCloseModal = () => {
    setErrorMessage('')
    setReportMessage('')
    setIsOpenModal(false)
  }

  useEffect(() => {
    if (jobId) {
      const handleGetJobDetail = async () => {
        const response = await fetch(API_ENDPOINT + '/job/detail/' + jobId)
        const data = await response.json()
        setJob(data as JobDetail)
      }
      const handleGetReport = async () => {
        const response = await fetch(API_ENDPOINT + '/report/' + jobId)
        const data = await response.json() as Response<Report>
        if (data.data) {
          setReport(data.data)
        }
      }
      handleGetJobDetail()
      handleGetReport()
    }
  }, [jobId])

  console.log(report)

  return (
    <>
      <ReportModal
        boosterName={job?.jobID?.boosterId?.nickname}
        reportMessage={reportMessage}
        errorMessage={errorMessage}
        isOpenModal={isOpenModal}
        handleChangeMessage={handleChangeMessage}
        handleChangeOpenModal={handleChangeOpenModal}
        onClose={handleCloseModal}
        onConfirm={handleSendReport}
      />
      <div className="bg-theme min-h-screen text-white py-12">
        <Link href="/my-jobs" className="flex w-[80%] mx-auto my-4 underline cursor-pointer hover:opacity-80">
          <Icon name="arrow-left" />
          <p className="px-2">Back to My Jobs</p>
        </Link>
        <div className="bg-gray-900 w-[80%] h-[500px] rounded-2xl p-8 mx-auto">
          <div className="flex justify-between items-center">
            <div className="basis-1/3"></div>
            <p className="font-semibold text-4xl text-center basis-1/3">Job Details</p>
            <div className="flex basis-1/3 justify-end">
              <Copy text={jobId} />
            </div>
          </div>
          <div className="flex my-12 gap-8">
            <div className="basis-1/2 flex justify-around items-center">
              <div className="basis-1/3">
                <p className="text-center font-semibold">FROM</p>
                <Image src={`/images/${job?.jobID?.fromLeague.toLowerCase()}.png`} alt={job?.jobID?.fromLeague ?? ''} width={300} height={300} className="mx-auto" />
                <p className="text-center font-semibold">
                  {job?.jobID?.fromLeague}{' '}
                  {job?.jobID?.fromDivision}
                </p>
              </div>
              <div>
                <Icon name="chevrons-right" size={40} />
              </div>
              <div className="basis-1/3">
                <p className="text-center font-semibold">TO</p>
                <Image src={`/images/${job?.jobID?.toLeague.toLowerCase()}.png`} alt={job?.jobID?.toLeague ?? ''} width={300} height={300} className="mx-auto" />
                <p className="text-center font-semibold">
                  {job?.jobID?.toLeague}{' '}
                  {job?.jobID?.toDivision}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <p className="text-xl font-semibold">Status:</p>
                <p className="bg-red-400 py-1 px-4 rounded-lg font-semibold">{job?.jobID?.status}</p>
              </div>
              <p className="text-xl font-semibold">Job Price: {formatCurrency(job?.paymentId?.amount)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 my-8 w-[80%] mx-auto">
          <div className="bg-gray-900 p-8 rounded-2xl basis-1/2 flex items-center gap-4">
            <Avatar className="w-20 h-20 text-large" />
            <div>
              <p className="font-semibold text-2xl">Booster: {job?.jobID?.boosterId?.nickname}</p>
              <div className="flex gap-2 items-center cursor-pointer hover:opacity-90 mt-1" onClick={handleChangeOpenModal}>
                <Icon name="alert-triangle" color="red" />
                <p className="text-red-600">{!!report ? 'View Report' : 'Report Booster'}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900"></div>
          <div className="bg-gray-900 p-8 rounded-2xl basis-1/2 flex items-center gap-4">
            <Avatar className="w-20 h-20 text-large" />
            <p className="font-semibold text-2xl">Manager: {job?.jobID?.managerId?.name}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetailScreen
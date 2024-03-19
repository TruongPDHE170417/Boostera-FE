import { Button, Progress, Skeleton } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Icon from '@components/icons'
import { RANK_IMAGES, RANK_LEVEL, RANK_LEVEL_LABEL, RANK_TYPE, RANK_TYPE_LABEL } from '@models/rank'
import { useBoundStore } from '@zustand/total'
import { API_ENDPOINT } from '@models/api'
import { Job } from '@models/job'
import Copy from '@components/common/Copy'
import { Payment } from '@models/payment'
import { useRouter } from 'next/router'
import { calcProgress } from '@utils/calcProgress'

type CurrentJob = {
  _id: string
  jobID: Job
  paymentId: Payment
  currentLeague: string
  currentDivision: string
  extraService: string
}

const MyJobsScreen = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  const route = useRouter()
  const [progress, setProgress] = useState<number>(0)

  const [job, setJob] = useState<CurrentJob>()
  const [isFetchingJob, setIsFetchingJob] = useState<boolean>(true)

  useEffect(() => {
    const handleFetchCurrentJob = async () => {
      const response = await fetch(API_ENDPOINT + "/job/current-job/" + accountInfo.userId)
      const data = await response.json()
      setJob(data as CurrentJob)
      setIsFetchingJob(false)
    }
    handleFetchCurrentJob()
  }, [])

  useEffect(() => {
    if (job?._id) {
      const newProgress = calcProgress(
        job.jobID.fromLeague,
        job.jobID.fromDivision,
        job.currentLeague,
        job.currentDivision,
        job.jobID.toLeague,
        job.jobID.toDivision,
      )
      setProgress(newProgress)
    }
  }, [job])

  const onViewDetail = () => {
    route.push('/job-detail/' + job?.jobID._id)
  }

  return (
    <div className="bg-theme min-h-screen text-white py-12 flex flex-col items-center">
      <p className="font-semibold text-4xl text-center my-8">Current Job</p>
      {!isFetchingJob ?
        <div className="bg-gray-900 w-[80%] h-[500px] rounded-2xl p-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">Boosting for: </span>
              <span className="underline">{accountInfo?.username}</span>
            </div>
            <div className="flex">
              <Copy text={job?.jobID._id ?? ""} />
            </div>
          </div>
          <div className="flex my-10">
            <div className="basis-1/3">
              <p className="text-center font-semibold">FROM</p>
              <Image src={`/images/${job?.jobID?.fromLeague.toLowerCase()}.png`} alt={job?.jobID?.fromLeague ?? ''} width={300} height={300} className="mx-auto" />
              <p className="text-center font-semibold">
                {job?.jobID?.fromLeague}{' '}
                {job?.jobID?.fromDivision}
              </p>
            </div>
            <div className="basis-1/3 -mt-10">
              <p className="text-center font-semibold">NOW</p>
              <Image src={`/images/${job?.currentLeague.toLowerCase()}.png`} alt={job?.currentLeague ?? ''} width={300} height={300} className="mx-auto" />
              <p className="text-center font-semibold">
                {job?.currentLeague}{' '}
                {job?.currentDivision}
              </p>
              <div className="my-4">
                <p className="text-center my-2">PROGRESS: {progress}%</p>
                <Progress color="danger" aria-label="Loading..." value={progress} />
              </div>
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
          <div className="flex justify-center">
            <Button color="danger" isDisabled={isFetchingJob} className="px-8 py-6 font-semibold text-lg" onClick={onViewDetail}>View Detail</Button>
          </div>
        </div>
        :
        <Skeleton className="bg-gray-900 w-[80%] h-[500px] rounded-2xl p-8" />
      }
    </div>
  )
}

export default MyJobsScreen
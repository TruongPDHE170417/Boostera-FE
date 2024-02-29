import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RANK_IMAGES, RANK_LEVEL, RANK_LEVEL_LABEL, RANK_TYPE, RANK_TYPE_LABEL } from '@models/rank'
import Icon from '@components/icons'
import { JOB_STATUS } from '@models/status'
import { Avatar } from '@nextui-org/react'

type Props = {
  jobId: string
}

const JobDetailScreen = ({ jobId }: Props) => {
  const [fromRank, setFromRank] = useState<RANK_TYPE>(RANK_TYPE.SILVER)
  const [fromLevel, setFromLevel] = useState<RANK_LEVEL>(RANK_LEVEL.TWO)

  const [toRank, setToRank] = useState<RANK_TYPE>(RANK_TYPE.DIAMOND)
  const [toLevel, setToLevel] = useState<RANK_LEVEL>(RANK_LEVEL.THREE)

  return (
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
            <span className="underline mx-2">{jobId}</span>
            <Icon name="copy" />
          </div>
        </div>
        <div className="flex my-12 gap-8">
          <div className="basis-1/2 flex justify-around items-center">
            <div className="basis-1/3">
              <p className="text-center font-semibold">FROM</p>
              <Image src={`/images/${RANK_IMAGES[fromRank - 1]}.png`} alt={RANK_IMAGES[fromRank - 1]} width={300} height={300} className="mx-auto" />
              <p className="text-center font-semibold">
                {RANK_TYPE_LABEL[fromRank]}{' '}
                {RANK_LEVEL_LABEL[fromLevel]}
              </p>
            </div>
            <div>
              <Icon name="chevrons-right" size={40} />
            </div>
            <div className="basis-1/3">
              <p className="text-center font-semibold">TO</p>
              <Image src={`/images/${RANK_IMAGES[toRank - 1]}.png`} alt={RANK_IMAGES[toRank - 1]} width={300} height={300} className="mx-auto" />
              <p className="text-center font-semibold">
                {RANK_TYPE_LABEL[toRank]}{' '}
                {RANK_LEVEL_LABEL[toLevel]}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <p className="text-xl font-semibold">Status:</p>
              <p className="bg-red-400 py-1 px-4 rounded-lg font-semibold">{JOB_STATUS.COMPLETED}</p>
            </div>
            <p className="text-xl font-semibold">Job Price: $50</p>
            <p className="text-xl font-semibold">From Date: 01/02/2024</p>
            <p className="text-xl font-semibold">End Date: 06/02/2024</p>
          </div>
        </div>
      </div>
      <div className="flex gap-8 my-8 w-[80%] mx-auto">
        <div className="bg-gray-900 p-8 rounded-2xl basis-1/2 flex items-center gap-4">
          <Avatar className="w-20 h-20 text-large" />
          <div>
            <p className="font-semibold text-2xl">Booster Account Name</p>
            <div className="flex gap-2 items-center">
              <Icon name="alert-triangle" color="red" />
              <p className="text-red-600">Report Booster</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900"></div>
        <div className="bg-gray-900 p-8 rounded-2xl basis-1/2 flex items-center gap-4">
          <Avatar className="w-20 h-20 text-large" />
          <p className="font-semibold text-2xl">Manager Account Name</p>
        </div>
      </div>
    </div>
  )
}

export default JobDetailScreen
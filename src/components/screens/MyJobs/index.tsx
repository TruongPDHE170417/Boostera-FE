import React, { useState } from 'react'
import Image from 'next/image'
import { Progress } from '@nextui-org/react'
import { useBoundStore } from '@zustand/total'
import Icon from '@components/icons'
import { RANK_IMAGES, RANK_LEVEL, RANK_LEVEL_LABEL, RANK_TYPE, RANK_TYPE_LABEL } from '@models/rank'

const MyJobsScreen = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  const [fromRank, setFromRank] = useState<RANK_TYPE>(RANK_TYPE.SILVER)
  const [fromLevel, setFromLevel] = useState<RANK_LEVEL>(RANK_LEVEL.TWO)

  const [nowRank, setNowRank] = useState<RANK_TYPE>(RANK_TYPE.GOLD)
  const [nowLevel, setNowLevel] = useState<RANK_LEVEL>(RANK_LEVEL.FOUR)

  const [toRank, setToRank] = useState<RANK_TYPE>(RANK_TYPE.DIAMOND)
  const [toLevel, setToLevel] = useState<RANK_LEVEL>(RANK_LEVEL.THREE)

  const [progress, setProgress] = useState<number>(75)

  return (
    <div className="bg-theme min-h-screen text-white py-12 flex flex-col items-center">
      <p className="font-semibold text-4xl text-center my-8">Current Job</p>
      <div className="bg-gray-900 w-[80%] h-[500px] rounded-2xl p-8">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">Boosting for: </span>
            <span className="underline">{accountInfo?.username}</span>
          </div>
          <div className="flex">
            <span className="underline mx-2">JobId</span>
            <Icon name="copy" />
          </div>
        </div>
        <div className="flex my-10">
          <div className="basis-1/3">
            <p className="text-center font-semibold">FROM</p>
            <Image src={`/images/${RANK_IMAGES[fromRank - 1]}.png`} alt={RANK_IMAGES[fromRank - 1]} width={300} height={300} className="mx-auto" />
            <p className="text-center font-semibold">
              {RANK_TYPE_LABEL[fromRank]}{' '}
              {RANK_LEVEL_LABEL[fromLevel]}
            </p>
          </div>
          <div className="basis-1/3 -mt-10">
            <p className="text-center font-semibold">NOW</p>
            <Image src={`/images/${RANK_IMAGES[nowRank - 1]}.png`} alt={RANK_IMAGES[nowRank - 1]} width={300} height={300} className="mx-auto" />
            <p className="text-center font-semibold">
              {RANK_TYPE_LABEL[nowRank]}{' '}
              {RANK_LEVEL_LABEL[nowLevel]}
            </p>
            <div className="my-4">
              <p className="text-center my-2">PROGRESS: {progress}%</p>
              <Progress color="danger" aria-label="Loading..." value={progress} />
            </div>
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
      </div>
    </div>
  )
}

export default MyJobsScreen
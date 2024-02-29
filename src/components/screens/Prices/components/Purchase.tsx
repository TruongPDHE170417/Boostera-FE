import React from 'react'
import { Button, Spinner } from '@nextui-org/react'
import Icon from '@components/icons'
import { RANK_LEVEL, RANK_LEVEL_LABEL, RANK_POINT, RANK_POINT_LABEL, RANK_TYPE, RANK_TYPE_LABEL } from '@models/rank'
import { OPTIONS, OPTIONS_LABEL } from './Options'
import { BOOSTER_TYPE } from '..'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'

type Props = {
  rankType: RANK_TYPE
  rankLevel: RANK_LEVEL
  rankPoint: RANK_POINT
  desiredRank: RANK_TYPE
  desiredLevel: RANK_LEVEL
  extraOptions: OPTIONS[]
  boosterType: BOOSTER_TYPE
  previousSeasonRank: RANK_TYPE
  gamesCount: number
  price: number
  isPurchasing: boolean
  handlePurchase: () => void
}

const Purchase = ({ rankType, rankLevel, rankPoint, desiredRank, desiredLevel, extraOptions, boosterType, previousSeasonRank, gamesCount, price, isPurchasing, handlePurchase }: Props) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="border border-white border-dashed rounded-full p-1">
            <Icon name="hourglass" size={12} />
          </div>
          <div>
            <p className="font-light text-sm">Approximate time:</p>
            <p className="font-semibold text-sm">About 3-5 days</p>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            {boosterType == BOOSTER_TYPE.DIVISION_BOOSTING ?
              <>
                <span className="font-light text-sm mr-1">League Elo Boost</span>
                <span className="font-semibold text-sm">from {RANK_TYPE_LABEL[rankType - 1]} {RANK_LEVEL_LABEL[rankLevel - 1]} {RANK_POINT_LABEL[rankPoint - 1]} to {RANK_TYPE_LABEL[desiredRank - 1]} {RANK_LEVEL_LABEL[desiredLevel - 1]}</span>
              </>
              :
              <>
                <span className="font-light text-sm mr-1">Boosting of</span>
                <span className="font-semibold text-sm">{gamesCount} Placement Games from {RANK_TYPE_LABEL[previousSeasonRank - 1] ?? "None Rank"}</span>
              </>
            }
          </div>
          <div className="flex gap-1">
            {!!extraOptions.length ?
              <>
                <div className="text-sm font-light whitespace-nowrap">Extra options:</div>
                <div className="text-sm font-semibold">
                  {extraOptions.map((option, index) => (
                    <span>{OPTIONS_LABEL[option - 1]} {index < extraOptions.length - 1 && ','}</span>
                  ))}
                </div>
              </>
              : <span className="text-sm font-light">No extra options</span>
            }
          </div>
        </div>
      </div>
      <div className="font-bold text-5xl mt-4">
        ${price ?? '--'}
      </div>
      <Button
        color="danger"
        className="w-full py-8 my-8 text-xl font-semibold"
        isLoading={isPurchasing}
        onClick={handlePurchase}
        spinner={<Spinner />}
      >
        {isPurchasing ? 'Purchasing' : 'Purchase'}
      </Button>
    </>
  )
}

export default Purchase
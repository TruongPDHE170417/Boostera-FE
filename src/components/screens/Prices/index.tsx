import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, SliderValue, Tab, Tabs } from '@nextui-org/react'
import { useBoundStore } from '@zustand/total'
import Icon from '@components/icons'
import RankType from '@components/common/RankType'
import RankLevel from '@components/common/RankLevel'
import RankPoint from '@components/common/RankPoint'
import Options, { OPTIONS } from './components/Options'
import Purchase from './components/Purchase'
import { RANK_LEVEL, RANK_POINT, RANK_TYPE } from '@models/rank'
import CustomerInformationModal from './components/CustomerInformationModal'

export enum BOOSTER_TYPE {
  DIVISION_BOOSTING = 1,
  PLACEMENT_GAMES,
}

const PricesScreen = () => {
  const [gamesCount, setGamesCount] = useState<SliderValue>(5)
  const [currentRank, setCurrentRank] = useState<RANK_TYPE>(RANK_TYPE.NONE)
  const [currentLevel, setCurrentLevel] = useState<RANK_LEVEL>(RANK_LEVEL.NONE)
  const [currentPoint, setCurrentPoint] = useState<RANK_POINT>(RANK_POINT.NONE)
  const [desiredRank, setDesiredRank] = useState<number>(0)
  const [desiredLevel, setDesiredLevel] = useState<number>(0)
  const [previousSeasonRank, setPreviousSeasonRank] = useState<RANK_TYPE>(RANK_TYPE.NONE)
  const [option, setOption] = useState<OPTIONS>(OPTIONS.NONE)
  const [options, setOptions] = useState<OPTIONS[]>([])
  const [isPurchaing, setIsPurchasing] = useState<boolean>(false)
  const [typeBooster, setTypeBooster] = useState<BOOSTER_TYPE>(BOOSTER_TYPE.DIVISION_BOOSTING)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  const handleSelectOption = (selectedOption: OPTIONS) => {
    if (option === selectedOption) {
      setOption(OPTIONS.NONE)
    } else {
      setOption(selectedOption)
    }
  }

  const handleApplyOption = (applyOption: OPTIONS) => {
    let newOptions: OPTIONS[]
    if (options.includes(applyOption)) {
      newOptions = options.filter(item => item !== applyOption)
    } else {
      newOptions = [...options, applyOption]
    }
    setOptions(newOptions)
  }

  const handlePurchase = () => {
    // TODO: update check accountInfo
    if (!!accountInfo.username) {
      setIsOpenModal(true)
    } else {
      // TODO: handle purchase
      setIsPurchasing(true)
    }
  }

  const handleChangeBoosterType = (key: React.Key) => {
    setTypeBooster(key as BOOSTER_TYPE)
  }

  const handleChangeOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <div className="min-h-screen bg-theme text-white">
      <div className="px-40">
        <div className="flex w-full flex-col items-center py-8">
          <Tabs aria-label="Options" className="w-full flex justify-center border-b-2 py-4" onSelectionChange={handleChangeBoosterType} color="danger">
            <Tab key={BOOSTER_TYPE.DIVISION_BOOSTING} title="Division Boosting" className="w-full px-20">
              <div className="flex w-full">
                <div className="w-1/2">
                  <p className="font-semibold mb-4">Current Position</p>
                  <div className="flex gap-2">
                    <RankType level={RANK_TYPE.IRON} isSelect={RANK_TYPE.IRON === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.IRON)} />
                    <RankType level={RANK_TYPE.BRONZE} isSelect={RANK_TYPE.BRONZE === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.BRONZE)} />
                    <RankType level={RANK_TYPE.SILVER} isSelect={RANK_TYPE.SILVER === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.SILVER)} />
                    <RankType level={RANK_TYPE.GOLD} isSelect={RANK_TYPE.GOLD === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.GOLD)} />
                    <RankType level={RANK_TYPE.PLATINUM} isSelect={RANK_TYPE.PLATINUM === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.PLATINUM)} />
                    <RankType level={RANK_TYPE.EMERALD} isSelect={RANK_TYPE.EMERALD === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.EMERALD)} />
                    <RankType level={RANK_TYPE.DIAMOND} isSelect={RANK_TYPE.DIAMOND === currentRank} onSelect={() => setCurrentRank(RANK_TYPE.DIAMOND)} />
                  </div>
                  <div className='flex gap-2 my-2'>
                    <RankLevel number={RANK_LEVEL.FOUR} isSelect={currentLevel === RANK_LEVEL.FOUR} onSelect={() => setCurrentLevel(RANK_LEVEL.FOUR)} />
                    <RankLevel number={RANK_LEVEL.THREE} isSelect={currentLevel === RANK_LEVEL.THREE} onSelect={() => setCurrentLevel(RANK_LEVEL.THREE)} />
                    <RankLevel number={RANK_LEVEL.TWO} isSelect={currentLevel === RANK_LEVEL.TWO} onSelect={() => setCurrentLevel(RANK_LEVEL.TWO)} />
                    <RankLevel number={RANK_LEVEL.ONE} isSelect={currentLevel === RANK_LEVEL.ONE} onSelect={() => setCurrentLevel(RANK_LEVEL.ONE)} />
                  </div>
                  <div className='flex gap-2 my-2'>
                    <RankPoint number={RANK_POINT.POINT_1} isSelect={currentPoint === RANK_POINT.POINT_1} onSelect={() => setCurrentPoint(RANK_POINT.POINT_1)} />
                    <RankPoint number={RANK_POINT.POINT_2} isSelect={currentPoint === RANK_POINT.POINT_2} onSelect={() => setCurrentPoint(RANK_POINT.POINT_2)} />
                    <RankPoint number={RANK_POINT.POINT_3} isSelect={currentPoint === RANK_POINT.POINT_3} onSelect={() => setCurrentPoint(RANK_POINT.POINT_3)} />
                    <RankPoint number={RANK_POINT.POINT_4} isSelect={currentPoint === RANK_POINT.POINT_4} onSelect={() => setCurrentPoint(RANK_POINT.POINT_4)} />
                    <RankPoint number={RANK_POINT.POINT_5} isSelect={currentPoint === RANK_POINT.POINT_5} onSelect={() => setCurrentPoint(RANK_POINT.POINT_5)} />
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="font-semibold mb-4">Desired Position</p>
                  <div className="flex gap-2">
                    <RankType level={RANK_TYPE.IRON} isSelect={RANK_TYPE.IRON === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.IRON)} />
                    <RankType level={RANK_TYPE.BRONZE} isSelect={RANK_TYPE.BRONZE === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.BRONZE)} />
                    <RankType level={RANK_TYPE.SILVER} isSelect={RANK_TYPE.SILVER === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.SILVER)} />
                    <RankType level={RANK_TYPE.GOLD} isSelect={RANK_TYPE.GOLD === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.GOLD)} />
                    <RankType level={RANK_TYPE.PLATINUM} isSelect={RANK_TYPE.PLATINUM === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.PLATINUM)} />
                    <RankType level={RANK_TYPE.EMERALD} isSelect={RANK_TYPE.EMERALD === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.EMERALD)} />
                    <RankType level={RANK_TYPE.DIAMOND} isSelect={RANK_TYPE.DIAMOND === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.DIAMOND)} />
                    <RankType level={RANK_TYPE.MASTER} isSelect={RANK_TYPE.MASTER === desiredRank} onSelect={() => setDesiredRank(RANK_TYPE.MASTER)} />
                  </div>
                  <div className='flex gap-2 my-2'>
                    <RankLevel number={RANK_LEVEL.FOUR} isSelect={desiredLevel === RANK_LEVEL.FOUR} onSelect={() => setDesiredLevel(RANK_LEVEL.FOUR)} />
                    <RankLevel number={RANK_LEVEL.THREE} isSelect={desiredLevel === RANK_LEVEL.THREE} onSelect={() => setDesiredLevel(RANK_LEVEL.THREE)} />
                    <RankLevel number={RANK_LEVEL.TWO} isSelect={desiredLevel === RANK_LEVEL.TWO} onSelect={() => setDesiredLevel(RANK_LEVEL.TWO)} />
                    <RankLevel number={RANK_LEVEL.ONE} isSelect={desiredLevel === RANK_LEVEL.ONE} onSelect={() => setDesiredLevel(RANK_LEVEL.ONE)} />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key={BOOSTER_TYPE.PLACEMENT_GAMES} title="Placement Games" className="w-full px-20">
              <div className="flex w-full gap-12">
                <div className="w-1/2">
                  <p className="font-semibold mb-4">Previous Season Rank</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <RankType level={RANK_TYPE.NONE} isSelect={RANK_TYPE.NONE === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.NONE)} />
                      <RankType level={RANK_TYPE.IRON} isSelect={RANK_TYPE.IRON === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.IRON)} />
                      <RankType level={RANK_TYPE.BRONZE} isSelect={RANK_TYPE.BRONZE === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.BRONZE)} />
                      <RankType level={RANK_TYPE.SILVER} isSelect={RANK_TYPE.SILVER === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.SILVER)} />
                    </div>
                    <div className="flex gap-2">
                      <RankType level={RANK_TYPE.GOLD} isSelect={RANK_TYPE.GOLD === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.GOLD)} />
                      <RankType level={RANK_TYPE.PLATINUM} isSelect={RANK_TYPE.PLATINUM === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.PLATINUM)} />
                      <RankType level={RANK_TYPE.EMERALD} isSelect={RANK_TYPE.EMERALD === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.EMERALD)} />
                      <RankType level={RANK_TYPE.DIAMOND} isSelect={RANK_TYPE.DIAMOND === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.DIAMOND)} />
                    </div>
                    <RankType level={RANK_TYPE.MASTER} isSelect={RANK_TYPE.MASTER === previousSeasonRank} onSelect={() => setPreviousSeasonRank(RANK_TYPE.MASTER)} />
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="font-semibold mb-4">Games Count</p>
                  <div className="border-gray-300 border-t-1 border-x-1 h-16 rounded-t-lg -mb-3">
                    <p className="text-4xl font-semibold p-2">{gamesCount}</p>
                  </div>
                  <Slider
                    onChange={(value: SliderValue) => setGamesCount(value)}
                    size="sm"
                    step={1}
                    color="danger"
                    showSteps={true}
                    maxValue={5}
                    minValue={1}
                    defaultValue={5}
                    className="max-w-md"
                    marks={[
                      {
                        value: 1,
                        label: "1",
                      },
                      {
                        value: 2,
                        label: "2",
                      },
                      {
                        value: 3,
                        label: "3",
                      },
                      {
                        value: 4,
                        label: "4",
                      },
                      {
                        value: 5,
                        label: "5",
                      },
                    ]}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
          <div className="border-t-2 flex gap-4 font-semibold text-gray-500 text-sm py-4 my-8">
            <div
              className={`cursor-pointer flex gap-1 ${options.includes(OPTIONS.DUO_BOOST) ? 'text-red-500' : option === OPTIONS.DUO_BOOST ? 'text-white' : ''}`}
              onClick={() => handleSelectOption(OPTIONS.DUO_BOOST)}
            >
              {options.includes(OPTIONS.DUO_BOOST) && <Icon name="check-circle" size={16} />}
              Duo Boost
            </div>
            <div
              className={`cursor-pointer flex gap-1 ${options.includes(OPTIONS.SELECT_BOOSTER) ? 'text-red-500' : option === OPTIONS.SELECT_BOOSTER ? 'text-white' : ''}`}
              onClick={() => handleSelectOption(OPTIONS.SELECT_BOOSTER)}
            >
              {options.includes(OPTIONS.SELECT_BOOSTER) && <Icon name="check-circle" size={16} />}
              Select Booster
            </div>
            <div
              className={`cursor-pointer flex gap-1 ${options.includes(OPTIONS.TURBO_BOOST) ? 'text-red-500' : option === OPTIONS.TURBO_BOOST ? 'text-white' : ''}`}
              onClick={() => handleSelectOption(OPTIONS.TURBO_BOOST)}
            >
              {options.includes(OPTIONS.TURBO_BOOST) && <Icon name="check-circle" size={16} />}
              Turbo Boost
            </div>
            <div
              className={`cursor-pointer flex gap-1 ${options.includes(OPTIONS.CHOOSE_CHAMPIONS) ? 'text-red-500' : option === OPTIONS.CHOOSE_CHAMPIONS ? 'text-white' : ''}`}
              onClick={() => handleSelectOption(OPTIONS.CHOOSE_CHAMPIONS)}
            >
              {options.includes(OPTIONS.CHOOSE_CHAMPIONS) && <Icon name="check-circle" size={16} />}
              Choose Champions
            </div>
            <div
              className={`cursor-pointer flex gap-1 ${options.includes(OPTIONS.STREAMING) ? 'text-red-500' : option === OPTIONS.STREAMING ? 'text-white' : ''}`} onClick={() => handleSelectOption(OPTIONS.STREAMING)}
            >
              {options.includes(OPTIONS.STREAMING) && <Icon name="check-circle" size={16} />}
              Streaming
            </div>
          </div>
          <div className="px-20">
            <Options option={option} options={options} handleApplyOption={handleApplyOption} />
          </div>
        </div>
      </div >
      <div className="bg-white h-2"></div>
      <div className="px-60 py-4">
        <Purchase
          rankType={currentRank}
          rankLevel={currentLevel}
          rankPoint={currentPoint}
          desiredRank={desiredRank}
          desiredLevel={desiredLevel}
          extraOptions={options}
          boosterType={typeBooster}
          previousSeasonRank={previousSeasonRank}
          gamesCount={gamesCount as number}
          isPurchasing={isPurchaing}
          handlePurchase={handlePurchase}
        />
      </div>
      <CustomerInformationModal isOpenModal={isOpenModal} handleChangeOpenModal={handleChangeOpenModal} />
    </div>
  )
}

export default PricesScreen
import React, { ChangeEvent, useEffect, useState } from "react"
import { Slider, SliderValue, Tab, Tabs } from "@nextui-org/react"
import { useBoundStore } from "@zustand/total"
import Icon from "@components/icons"
import RankType from "@components/common/RankType"
import RankLevel from "@components/common/RankLevel"
import RankPoint from "@components/common/RankPoint"
import Options, { OPTIONS } from "./components/Options"
import Purchase from "./components/Purchase"
import { RANK_IMAGES, RANK_LEVEL, RANK_POINT, RANK_POINT_CALC, RANK_TYPE } from "@models/rank"
import CustomerInformationModal from "./components/CustomerInformationModal"
import VerifyOtpModal from "./components/VerifyOtpModal"
import { API_ENDPOINT } from "@models/api"
import { PriceType } from "../../../types/price"
import { CustomerInformationRegister } from "@types/customer"
import { string } from "zod"
import { useRouter } from "next/router"
import { InputOtp } from "@types/otp"

export enum BOOSTER_TYPE {
  DIVISION_BOOSTING = 1,
  PLACEMENT_GAMES,
}

const PricesScreen = () => {
  const router = useRouter()
  const [gamesCount, setGamesCount] = useState<SliderValue>(5)
  const [currentRank, setCurrentRank] = useState<RANK_TYPE>(RANK_TYPE.NONE)
  const [currentLevel, setCurrentLevel] = useState<RANK_LEVEL>(RANK_LEVEL.NONE)
  const [currentPoint, setCurrentPoint] = useState<RANK_POINT>(RANK_POINT.NONE)
  const [desiredRank, setDesiredRank] = useState<number>(0)
  const [desiredLevel, setDesiredLevel] = useState<number>(0)
  const [previousSeasonRank, setPreviousSeasonRank] = useState<RANK_TYPE>(RANK_TYPE.NONE)
  const [option, setOption] = useState<OPTIONS>(OPTIONS.NONE)
  const [options, setOptions] = useState<OPTIONS[]>([])
  const [promotion, setPromotion] = useState<number>(0)
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false)
  const [typeBooster, setTypeBooster] = useState<BOOSTER_TYPE>(BOOSTER_TYPE.DIVISION_BOOSTING)
  const [isOpenModalInfo, setIsOpenModalInfo] = useState<boolean>(false)
  const [isOpenModalVerify, setIsOpenModalVerify] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)

  const [customerInformation, setCustomerInformation] = useState<CustomerInformationRegister>({
    email: "",
    accountName: "",
    tagId: "",
  })
  const [inputOtp, setInputOtp] = useState<InputOtp>({
    otp: "",
  })

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
      newOptions = options.filter((item) => item !== applyOption)
    } else {
      newOptions = [...options, applyOption]
    }
    setOptions(newOptions)
  }

  const handlePurchase = () => {
    // TODO: update check accountInfo
    if (!!accountInfo.username) {
      setIsOpenModalInfo(true)
    } else {
      // TODO: handle purchase
      setIsPurchasing(true)
    }
  }

  const handleChangeBoosterType = (key: React.Key) => {
    setTypeBooster(key as BOOSTER_TYPE)
  }

  const handleChangeOpenModalInfo = () => {
    setIsOpenModalInfo(!isOpenModalInfo)
  }

  const handleChangeOpenModalVerify = () => {
    setIsOpenModalVerify(!isOpenModalVerify)
  }

  const handleConfirmInformation = () => {
    setIsOpenModalInfo(false)
    setIsOpenModalVerify(true)

    const createOtp = async () => {
      const response = await fetch(API_ENDPOINT + "/send-email/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: customerInformation.email,
        }),
      })
      const data = await response.json()
      console.log(data)
    }
    createOtp()
  }

  const paymentProc = async (email: string) => {
    const createPayment = async () => {
      const additionalParam = {
        email: email,
        fromPosition: currentRank,
        fromLevel: currentLevel,
        fromLp: currentPoint,
        toPosition: desiredRank,
        toLevel: desiredLevel,
        extraService: options.length != 0? options : null,
      }
      const response = await fetch(API_ENDPOINT + "/payment/create_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          additionalParam: additionalParam,
          amount: price * 26000,
          locale: "vn",
        }),
      })
      const data = (await response.json()) as { url: string; orderId: string }

      const redirectUrl = data.url
      if (redirectUrl) {
        router.push(redirectUrl)
      }
      console.log(data)
    }
    //create payment when verify account complete
    createPayment()
  }

  const handleVerifyOtp = async () => {
    // TODO: handle create job, payment
    const input = inputOtp.otp
    console.log("verify otp: " + input)
    //handle condition here
    const verifyOtp = async () => {
      const response = await fetch(API_ENDPOINT + "/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customerInformation.email,
          code: input,
        }),
      })
      const data = (await response.json()) as { isValidOTP: boolean }
      const resultOtp = data.isValidOTP
      console.log(resultOtp)
    }
    verifyOtp() //Delete later since i dont understand the logic of this function
    //if user NOT have existed account
    const createUser = async () => {
      const response = await fetch(API_ENDPOINT + "/user/register", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerInformation.email,
          email: customerInformation.email,
          ING: customerInformation.accountName,
          tag: customerInformation.tagId,
        }),
      })
      const data = (await response.json()) as {
        message: string
        data: {
          name: string
          email: string
          password: string
          ING: string
          tag: string
        }
      }
      return data.data
    }
    const createdNewUser = await createUser()
    paymentProc(createdNewUser.email)
  }

  const handleUpdateCustomerInformation = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCustomerInformation({
      ...customerInformation,
      [name]: value,
    })
  }

  const handleUpdateInputOtp = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInputOtp({
      ...inputOtp,
      [name]: value,
    })
    console.log(`input otp: ${inputOtp.otp}`)
  }

  useEffect(() => {
    const handleGetPrice = async () => {
      const response = await fetch(API_ENDPOINT + "/pricing/division/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating_from_league: RANK_IMAGES[currentRank - 1]?.toUpperCase(),
          rating_from_division: currentLevel,
          rating_from_lp: RANK_POINT_CALC[currentPoint - 1],
          rating_to_league: RANK_IMAGES[desiredRank - 1]?.toUpperCase(),
          rating_to_division: desiredLevel,
          promotion: promotion,
          rating_options_duo_boost_active: options.includes(OPTIONS.DUO_BOOST),
          rating_options_select_booster_active: options.includes(OPTIONS.SELECT_BOOSTER),
          rating_options_turbo_boost_active: options.includes(OPTIONS.TURBO_BOOST),
          rating_options_pick_heroes_active: options.includes(OPTIONS.CHOOSE_CHAMPIONS),
          rating_options_streaming_active: options.includes(OPTIONS.STREAMING),
        }),
      })
      const priceData = (await response.json()) as PriceType
      console.log(priceData)
      setPrice(priceData.price)
    }
    handleGetPrice()
  }, [currentRank, currentLevel, currentPoint, desiredRank, desiredLevel])

  console.log(customerInformation)

  return (
    <div className="min-h-screen bg-theme text-white">
      <div className="px-40">
        <div className="flex w-full flex-col items-center py-8">
          <Tabs
            aria-label="Options"
            className="flex w-full justify-center border-b-2 py-4"
            onSelectionChange={handleChangeBoosterType}
            color="danger"
          >
            <Tab key={BOOSTER_TYPE.DIVISION_BOOSTING} title="Division Boosting" className="w-full px-20">
              <div className="flex w-full">
                <div className="w-1/2">
                  <p className="mb-4 font-semibold">Current Position</p>
                  <div className="flex gap-2">
                    <RankType
                      level={RANK_TYPE.IRON}
                      isSelect={RANK_TYPE.IRON === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.IRON)}
                    />
                    <RankType
                      level={RANK_TYPE.BRONZE}
                      isSelect={RANK_TYPE.BRONZE === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.BRONZE)}
                    />
                    <RankType
                      level={RANK_TYPE.SILVER}
                      isSelect={RANK_TYPE.SILVER === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.SILVER)}
                    />
                    <RankType
                      level={RANK_TYPE.GOLD}
                      isSelect={RANK_TYPE.GOLD === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.GOLD)}
                    />
                    <RankType
                      level={RANK_TYPE.PLATINUM}
                      isSelect={RANK_TYPE.PLATINUM === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.PLATINUM)}
                    />
                    <RankType
                      level={RANK_TYPE.EMERALD}
                      isSelect={RANK_TYPE.EMERALD === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.EMERALD)}
                    />
                    <RankType
                      level={RANK_TYPE.DIAMOND}
                      isSelect={RANK_TYPE.DIAMOND === currentRank}
                      onSelect={() => setCurrentRank(RANK_TYPE.DIAMOND)}
                    />
                  </div>
                  <div className="my-2 flex gap-2">
                    <RankLevel
                      number={RANK_LEVEL.FOUR}
                      isSelect={currentLevel === RANK_LEVEL.FOUR}
                      onSelect={() => setCurrentLevel(RANK_LEVEL.FOUR)}
                    />
                    <RankLevel
                      number={RANK_LEVEL.THREE}
                      isSelect={currentLevel === RANK_LEVEL.THREE}
                      onSelect={() => setCurrentLevel(RANK_LEVEL.THREE)}
                    />
                    <RankLevel
                      number={RANK_LEVEL.TWO}
                      isSelect={currentLevel === RANK_LEVEL.TWO}
                      onSelect={() => setCurrentLevel(RANK_LEVEL.TWO)}
                    />
                    <RankLevel
                      number={RANK_LEVEL.ONE}
                      isSelect={currentLevel === RANK_LEVEL.ONE}
                      onSelect={() => setCurrentLevel(RANK_LEVEL.ONE)}
                    />
                  </div>
                  <div className="my-2 flex gap-2">
                    <RankPoint
                      number={RANK_POINT.POINT_1}
                      isSelect={currentPoint === RANK_POINT.POINT_1}
                      onSelect={() => setCurrentPoint(RANK_POINT.POINT_1)}
                    />
                    <RankPoint
                      number={RANK_POINT.POINT_2}
                      isSelect={currentPoint === RANK_POINT.POINT_2}
                      onSelect={() => setCurrentPoint(RANK_POINT.POINT_2)}
                    />
                    <RankPoint
                      number={RANK_POINT.POINT_3}
                      isSelect={currentPoint === RANK_POINT.POINT_3}
                      onSelect={() => setCurrentPoint(RANK_POINT.POINT_3)}
                    />
                    <RankPoint
                      number={RANK_POINT.POINT_4}
                      isSelect={currentPoint === RANK_POINT.POINT_4}
                      onSelect={() => setCurrentPoint(RANK_POINT.POINT_4)}
                    />
                    <RankPoint
                      number={RANK_POINT.POINT_5}
                      isSelect={currentPoint === RANK_POINT.POINT_5}
                      onSelect={() => setCurrentPoint(RANK_POINT.POINT_5)}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="mb-4 font-semibold">Desired Position</p>
                  <div className="flex gap-2">
                    <RankType
                      level={RANK_TYPE.IRON}
                      isSelect={RANK_TYPE.IRON === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.IRON)}
                    />
                    <RankType
                      level={RANK_TYPE.BRONZE}
                      isSelect={RANK_TYPE.BRONZE === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.BRONZE)}
                    />
                    <RankType
                      level={RANK_TYPE.SILVER}
                      isSelect={RANK_TYPE.SILVER === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.SILVER)}
                    />
                    <RankType
                      level={RANK_TYPE.GOLD}
                      isSelect={RANK_TYPE.GOLD === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.GOLD)}
                    />
                    <RankType
                      level={RANK_TYPE.PLATINUM}
                      isSelect={RANK_TYPE.PLATINUM === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.PLATINUM)}
                    />
                    <RankType
                      level={RANK_TYPE.EMERALD}
                      isSelect={RANK_TYPE.EMERALD === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.EMERALD)}
                    />
                    <RankType
                      level={RANK_TYPE.DIAMOND}
                      isSelect={RANK_TYPE.DIAMOND === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.DIAMOND)}
                    />
                    <RankType
                      level={RANK_TYPE.MASTER}
                      isSelect={RANK_TYPE.MASTER === desiredRank}
                      onSelect={() => setDesiredRank(RANK_TYPE.MASTER)}
                    />
                  </div>
                  {desiredRank === RANK_TYPE.MASTER ? null : (
                    <div className="my-2 flex gap-2">
                      <RankLevel
                        number={RANK_LEVEL.FOUR}
                        isSelect={desiredLevel === RANK_LEVEL.FOUR}
                        onSelect={() => setDesiredLevel(RANK_LEVEL.FOUR)}
                      />
                      <RankLevel
                        number={RANK_LEVEL.THREE}
                        isSelect={desiredLevel === RANK_LEVEL.THREE}
                        onSelect={() => setDesiredLevel(RANK_LEVEL.THREE)}
                      />
                      <RankLevel
                        number={RANK_LEVEL.TWO}
                        isSelect={desiredLevel === RANK_LEVEL.TWO}
                        onSelect={() => setDesiredLevel(RANK_LEVEL.TWO)}
                      />
                      <RankLevel
                        number={RANK_LEVEL.ONE}
                        isSelect={desiredLevel === RANK_LEVEL.ONE}
                        onSelect={() => setDesiredLevel(RANK_LEVEL.ONE)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Tab>
            <Tab key={BOOSTER_TYPE.PLACEMENT_GAMES} title="Placement Games" className="w-full px-20">
              <div className="flex w-full gap-12">
                <div className="w-1/2">
                  <p className="mb-4 font-semibold">Previous Season Rank</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <RankType
                        level={RANK_TYPE.NONE}
                        isSelect={RANK_TYPE.NONE === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.NONE)}
                      />
                      <RankType
                        level={RANK_TYPE.IRON}
                        isSelect={RANK_TYPE.IRON === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.IRON)}
                      />
                      <RankType
                        level={RANK_TYPE.BRONZE}
                        isSelect={RANK_TYPE.BRONZE === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.BRONZE)}
                      />
                      <RankType
                        level={RANK_TYPE.SILVER}
                        isSelect={RANK_TYPE.SILVER === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.SILVER)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <RankType
                        level={RANK_TYPE.GOLD}
                        isSelect={RANK_TYPE.GOLD === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.GOLD)}
                      />
                      <RankType
                        level={RANK_TYPE.PLATINUM}
                        isSelect={RANK_TYPE.PLATINUM === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.PLATINUM)}
                      />
                      <RankType
                        level={RANK_TYPE.EMERALD}
                        isSelect={RANK_TYPE.EMERALD === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.EMERALD)}
                      />
                      <RankType
                        level={RANK_TYPE.DIAMOND}
                        isSelect={RANK_TYPE.DIAMOND === previousSeasonRank}
                        onSelect={() => setPreviousSeasonRank(RANK_TYPE.DIAMOND)}
                      />
                    </div>
                    <RankType
                      level={RANK_TYPE.MASTER}
                      isSelect={RANK_TYPE.MASTER === previousSeasonRank}
                      onSelect={() => setPreviousSeasonRank(RANK_TYPE.MASTER)}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="mb-4 font-semibold">Games Count</p>
                  <div className="-mb-3 h-16 rounded-t-lg border-x-1 border-t-1 border-gray-300">
                    <p className="p-2 text-4xl font-semibold">{gamesCount}</p>
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
          <div className="my-8 flex gap-4 border-t-2 py-4 text-sm font-semibold text-gray-500">
            <div
              className={`flex cursor-pointer gap-1 ${options.includes(OPTIONS.DUO_BOOST) ? "text-red-500" : option === OPTIONS.DUO_BOOST ? "text-white" : ""}`}
              onClick={() => handleSelectOption(OPTIONS.DUO_BOOST)}
            >
              {options.includes(OPTIONS.DUO_BOOST) && <Icon name="check-circle" size={16} />}
              Duo Boost
            </div>
            <div
              className={`flex cursor-pointer gap-1 ${options.includes(OPTIONS.SELECT_BOOSTER) ? "text-red-500" : option === OPTIONS.SELECT_BOOSTER ? "text-white" : ""}`}
              onClick={() => handleSelectOption(OPTIONS.SELECT_BOOSTER)}
            >
              {options.includes(OPTIONS.SELECT_BOOSTER) && <Icon name="check-circle" size={16} />}
              Select Booster
            </div>
            <div
              className={`flex cursor-pointer gap-1 ${options.includes(OPTIONS.TURBO_BOOST) ? "text-red-500" : option === OPTIONS.TURBO_BOOST ? "text-white" : ""}`}
              onClick={() => handleSelectOption(OPTIONS.TURBO_BOOST)}
            >
              {options.includes(OPTIONS.TURBO_BOOST) && <Icon name="check-circle" size={16} />}
              Turbo Boost
            </div>
            <div
              className={`flex cursor-pointer gap-1 ${options.includes(OPTIONS.CHOOSE_CHAMPIONS) ? "text-red-500" : option === OPTIONS.CHOOSE_CHAMPIONS ? "text-white" : ""}`}
              onClick={() => handleSelectOption(OPTIONS.CHOOSE_CHAMPIONS)}
            >
              {options.includes(OPTIONS.CHOOSE_CHAMPIONS) && <Icon name="check-circle" size={16} />}
              Choose Champions
            </div>
            <div
              className={`flex cursor-pointer gap-1 ${options.includes(OPTIONS.STREAMING) ? "text-red-500" : option === OPTIONS.STREAMING ? "text-white" : ""}`}
              onClick={() => handleSelectOption(OPTIONS.STREAMING)}
            >
              {options.includes(OPTIONS.STREAMING) && <Icon name="check-circle" size={16} />}
              Streaming
            </div>
          </div>
          <div className="px-20">
            <Options option={option} options={options} handleApplyOption={handleApplyOption} />
          </div>
        </div>
      </div>
      <div className="h-2 bg-white"></div>
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
          price={price}
          isPurchasing={isPurchasing}
          handlePurchase={handlePurchase}
        />
      </div>
      <CustomerInformationModal
        isOpenModal={isOpenModalInfo}
        handleChangeOpenModal={handleChangeOpenModalInfo}
        handleCustomerInformation={handleUpdateCustomerInformation}
        onConfirm={handleConfirmInformation}
      />
      <VerifyOtpModal
        isOpenModal={isOpenModalVerify}
        handleChangeOpenModal={handleChangeOpenModalVerify}
        handleInputOtp={handleUpdateInputOtp}
        onConfirm={handleVerifyOtp}
      />
    </div>
  )
}

export default PricesScreen

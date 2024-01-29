import { Divider } from "@nextui-org/react"
import React from "react"

const PositionRequirement = () => {
  return (
    <div className="bg-slate-700 p-9 ps-36 h-full">
      <h3 className="text-4xl font-semibold text-white">Position Requirement</h3>
      <Divider className="my-4  bg-red-500" />
      <div className="text-lg text-white">
        <p>Please read the following requirements carefully:</p>
        <ul className="list-inside list-disc">
          <li className="text-red-500">
            <span className="text-white m-0">Having at least an Diamond 1 Rank on your Account</span>
          </li>
          <li className="text-red-500 mr-0">
            <span className="text-white">
              Boosting for at least 5-8 hours a day if you claimed an order. You decide when to claim an order and you
              also can drop an order if for some reason you can&apos;t continue to boost.
            </span>
          </li>
          <li className="text-red-500 mr-0">
            <span className="text-white">
              Honesty and mental stability. Any toxic behavior and even more so the use of third party software (like
              cheats or scripts) leads to an inevitable ban.
            </span>
          </li>
          <li className="text-red-500 mr-0">
            <span className="text-white">
              Compliance with the service rules for boosters (they are intuitive and not hard)
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PositionRequirement

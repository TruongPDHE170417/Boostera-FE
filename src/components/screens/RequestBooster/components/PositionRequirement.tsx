import { Divider } from "@nextui-org/react"
import React from "react"

const PositionRequirement = () => {
  return (
    <div>
      <h3>Position Requirement</h3>
      <Divider className="my-4" />
      <div>
        <p>Please read the following requirements carefully:</p>
        <ul>
          <li>Having at least an Diamond 1 Rank on your Account</li>
          <li>
            Boosting for at least 5-8 hours a day if you claimed an order. You decide when to claim an order and you
            also can drop an order if for some reason you can&apos;t continue to boost.
          </li>
          <li>
            Honesty and mental stability. Any toxic behavior and even more so the use of third party software (like
            cheats or scripts) leads to an inevitable ban.
          </li>
          <li>Compliance with the service rules for boosters (they are intuitive and not hard)</li>
        </ul>
      </div>
    </div>
  )
}

export default PositionRequirement

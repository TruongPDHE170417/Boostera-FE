import React from "react"
import CareerForm from "./components/CareerForm"
import Overview from "./components/Overview"
import PositionRequirement from "./components/PositionRequirement"
import ServiceRules from "./components/ServiceRules"

const RequestBoosterScreen = () => {
  return (
    <div className="bg-theme">
      <Overview />
      <ServiceRules />
      <div className="flex h-[40rem]">
        <div className="h-full flex-1">
          <PositionRequirement />
        </div>
        <div className="h-full flex-1 px-20">
          <CareerForm />
        </div>
      </div>
    </div>
  )
}

export default RequestBoosterScreen

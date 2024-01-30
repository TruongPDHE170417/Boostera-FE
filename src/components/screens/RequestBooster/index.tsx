import React from "react"
import Overview from "./components/Overview"
import ServiceRules from "./components/ServiceRules"
import PositionRequirement from "./components/PositionRequirement"
import CareerForm from "./components/CareerForm"

const RequestBooster = () => {
  return (
    <div className="bg-gray-800">
      <Overview />
      <ServiceRules />
      <div className="flex h-[40rem] gap-10">
        <div className="flex-1 h-full">
          <PositionRequirement/>
        </div>
        <div className="flex-1 h-full">
          <CareerForm />
        </div>
      </div>
    </div>
  )
}

export default RequestBooster

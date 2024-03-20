import { Button, Divider } from "@nextui-org/react"
import { motion } from "framer-motion"
import React, { useState } from "react"

const variant = {
  open: { opacity: 1, y: 0, height: "auto", overflow: "visible" },
  closed: { opacity: 0, y: 40, height: 0, overflow: "hidden" },
}

const ServiceRules = () => {
  const [showRulesDetail, setShowRulesDetail] = useState(false)
  const [showRulesGeneral, setShowRulesGeneral] = useState(true)

  const toggleRulesDetail = () => {
    setShowRulesDetail(!showRulesDetail)
    setShowRulesGeneral(!showRulesGeneral)
  }

  return (
    <>
      <motion.div animate={showRulesGeneral ? "open" : "closed"} variants={variant} transition={{ duration: 0.5 }}>
        <div className="mx-auto my-5 flex h-auto w-5/6 items-center justify-center space-x-60 bg-slate-700 py-5 align-middle text-lg text-white">
          <div>
            <h1 className="text-xl">Service Rules</h1>
          </div>
          <Button color="primary" size="lg" className="px-28" onClick={toggleRulesDetail}>
            Read
          </Button>
        </div>
      </motion.div>
      <motion.div animate={showRulesDetail ? "open" : "closed"} variants={variant} transition={{ duration: 0.5 }}>
        <div className=" mx-auto my-5 h-auto w-5/6 bg-slate-700 px-20  py-5 text-center text-lg text-white">
          <h1 className="mb-5 text-3xl font-semibold">Service Rules</h1>
          <div className="grid grid-cols-3 gap-3 text-left">
            <div>
              <h3 className="text-xl font-semibold text-white">General</h3>
              <Divider className="my-4  bg-red-500" />
              <div className="text-medium text-white">
                <ul className="list-inside list-decimal">
                  <li>
                    <span className="m-0 text-white">Having at least an Diamond 1 Rank on your Account</span>
                  </li>
                  <li>
                    <span className="text-white">
                      The use of any hacks or scripts on a customer&apos;s account will lead to a ban on the service
                      without a payout.
                    </span>
                  </li>
                  <li>
                    <span className="text-white">
                      Direct contacts with customers outside of the service (and League game client during duoq
                      boosting) are forbidden.
                    </span>
                  </li>
                  <li>
                    <span className="text-white">
                      In order to complete the order properly, you have to upload a screenshot of the customer&apos;s
                      profile, which should be taken after the final game. We need it as a proof to fight againts the
                      fraud chargebacks.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* -- */}

            <div>
              <h3 className="text-xl font-semibold text-white">Boosting Process</h3>
              <Divider className="my-4  bg-red-500" />
              <div className="text-medium text-white">
                <ul className="list-inside list-decimal">
                  <li>
                    <span className="m-0 text-white">
                      Never flame during your games on the customer&apos;s account. Causing a ranked restriction or ban
                      on the customer&apos;s account will lead to a cash penalty or ban on the service.
                    </span>
                  </li>
                  <li>
                    <span className="text-white">Never spoil yourself as a booster.</span>
                  </li>
                  <li>
                    <span className="text-white">
                      Do not chat with the people from the customer&apos;s friend list unless you&apos;re asked by the
                      customer to do that.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* -- */}
            <div>
              <h3 className="text-xl font-semibold text-white">Quality of the Service</h3>
              <Divider className="my-4  bg-red-500" />
              <div className="text-medium text-white">
                <ul className="list-inside list-decimal">
                  <li>
                    <span className="m-0 text-white">
                      To introduce yourself first to the customer and then to ask him, whether he has any questions
                      would be a great start of the conversation and will definitely increase your chances to get 5
                      stars feedback and the tips when the boost is over.
                    </span>
                  </li>
                  <li>
                    <span className="text-white">
                      You have to start working on order within 15 minutes after you claimed it. You cannot save the
                      orders for later.
                    </span>
                  </li>
                  <li>
                    <span className="text-white">
                      Stay always online in the service chat during boosting to be in a regular contact with the
                      customer.
                    </span>
                  </li>
                  <li>
                    <span className="text-white">
                      Warn the customer, if your boosting session is over and inform, when you plan to continue.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-lg text-white">
              Please be aware, the violation of the rules below may result in cash penalty or dismissal!
            </h3>
          </div>
          <div>
            <Button color="primary" size="lg" className="px-28" onClick={toggleRulesDetail}>
              I understand
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ServiceRules

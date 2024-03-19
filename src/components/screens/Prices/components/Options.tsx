import { motion } from 'framer-motion'
import React from 'react'
import ChooseChampions from './ChooseChampions'
import DuoBoost from './DuoBoost'
import SelectBooster from './SelectBooster'
import Streaming from './Streaming'
import TurboBoost from './TurboBoost'

const variants = {
  open: { opacity: 1, y: 0, height: 'auto', overflow: 'visible' },
  closed: { opacity: 0, y: 40, height: 0, overflow: "hidden" },
}

export enum OPTIONS {
  NONE = 0,
  DUO_BOOST,
  SELECT_BOOSTER,
  TURBO_BOOST,
  CHOOSE_CHAMPIONS,
  STREAMING,
}

export const OPTIONS_LABEL = ["Duo Boost", "Select Booster", "Turbo Boost", "Choose Champions", "Streaming"]

type Props = {
  option: OPTIONS
  options: OPTIONS[]
  handleApplyOption: (option: OPTIONS) => void
}

const Options = ({ option, options, handleApplyOption }: Props) => {
  return (
    <>
      <motion.div
        animate={option === OPTIONS.DUO_BOOST ? "open" : "closed"}
        variants={variants}
      >
        <DuoBoost options={options} handleApplyOption={handleApplyOption} />
      </motion.div>
      <motion.div
        animate={option === OPTIONS.SELECT_BOOSTER ? "open" : "closed"}
        variants={variants}
      >
        <SelectBooster options={options} handleApplyOption={handleApplyOption} />
      </motion.div>
      <motion.div
        animate={option === OPTIONS.TURBO_BOOST ? "open" : "closed"}
        variants={variants}
      >
        <TurboBoost options={options} handleApplyOption={handleApplyOption} />
      </motion.div>
      <motion.div
        animate={option === OPTIONS.CHOOSE_CHAMPIONS ? "open" : "closed"}
        variants={variants}
      >
        <ChooseChampions options={options} handleApplyOption={handleApplyOption} />
      </motion.div>
      <motion.div
        animate={option === OPTIONS.STREAMING ? "open" : "closed"}
        variants={variants}
      >
        <Streaming options={options} handleApplyOption={handleApplyOption} />
      </motion.div>
    </>
  )
}

export default Options
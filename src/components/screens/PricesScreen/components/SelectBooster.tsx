import Icon from '@components/icons'
import { Button } from '@nextui-org/react'
import React from 'react'
import { OPTIONS } from './Options'

type Props = {
  options: OPTIONS[]
  handleApplyOption: (option: OPTIONS) => void
}

const SelectBooster = ({ options, handleApplyOption }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div>
        <Icon name="mouse-pointer-square" color="red" size={50} />
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">Select Booster (+10%)</p>
        <p className="font-light text-sm">Have a favorite booster or enjoyed a previous one's services? With our "Select a Booster" option, you can choose your preferred professional for a seamless LoL Boost experience.</p>
      </div>
      <div >
        <Button color={options.includes(OPTIONS.SELECT_BOOSTER) ? 'default' : 'danger'} className="px-16 float-end" onClick={() => handleApplyOption(OPTIONS.SELECT_BOOSTER)}>{options.includes(OPTIONS.SELECT_BOOSTER) ? 'Cancel' : 'Apply'}</Button>
      </div>
    </div>
  )
}

export default SelectBooster
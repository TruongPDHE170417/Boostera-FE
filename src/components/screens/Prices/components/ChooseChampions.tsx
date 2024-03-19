import { Button } from '@nextui-org/react'
import React from 'react'
import Icon from '@components/icons'
import { OPTIONS } from './Options'

type Props = {
  options: OPTIONS[]
  handleApplyOption: (option: OPTIONS) => void
}

const ChooseChampions = ({ options, handleApplyOption }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div>
        <Icon name="joystick" color="red" size={50} />
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">Choose Champions (free)</p>
        <p className="font-light text-sm">Get champion-specific LoL Elo Boosting at Boosteria! Opt for this in your customer area to boost your performance on selected champions. Choose your preferred champions and let our professional boosters elevate your rank.</p>
      </div>
      <div >
        <Button color={options.includes(OPTIONS.CHOOSE_CHAMPIONS) ? 'default' : 'danger'} className="px-16 float-end" onClick={() => handleApplyOption(OPTIONS.CHOOSE_CHAMPIONS)}>{options.includes(OPTIONS.CHOOSE_CHAMPIONS) ? 'Cancel' : 'Apply'}</Button>
      </div>
    </div>
  )
}

export default ChooseChampions
import React from 'react'
import { Button } from '@nextui-org/react'
import Icon from '@components/icons'
import { OPTIONS } from './Options'

type Props = {
  options: OPTIONS[]
  handleApplyOption: (option: OPTIONS) => void
}

const TurboBoost = ({ options, handleApplyOption }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div>
        <Icon name="chevrons-up" color="red" size={50} />
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">Turbo Boost (+20%)</p>
        <p className="font-light text-sm">Upgrade your Elo Boost order with our Priority feature! Your request will be prioritized and your booster's payout increased. Achieve your desired rank faster and easier with Boosteria's LoL Boost services.</p>
      </div>
      <div >
        <Button color={options.includes(OPTIONS.TURBO_BOOST) ? 'default' : 'danger'} className="px-16 float-end" onClick={() => handleApplyOption(OPTIONS.TURBO_BOOST)}>{options.includes(OPTIONS.TURBO_BOOST) ? 'Cancel' : 'Apply'}</Button>
      </div>
    </div>
  )
}

export default TurboBoost
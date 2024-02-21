import React from 'react'
import { Button } from '@nextui-org/react'
import Icon from '@components/icons'
import { OPTIONS } from './Options'

type Props = {
  options: OPTIONS[]
  handleApplyOption: (option: OPTIONS) => void
}

const DuoBoost = ({ options, handleApplyOption }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div>
        <Icon name="users" color="red" size={50} />
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">Duo Boost (+65%)</p>
        <p className="font-light text-sm">Experience the excitement of teaming up with a professional LoL player on your own account! Select this option and our boosters will join you for an unparalleled gaming journey, enhancing your LoL Elo Boosting experience.</p>
      </div>
      <div >
        <Button color={options.includes(OPTIONS.DUO_BOOST) ? 'default' : 'danger'} className="px-16 float-end" onClick={() => handleApplyOption(OPTIONS.DUO_BOOST)}>{options.includes(OPTIONS.DUO_BOOST) ? 'Cancel' : 'Apply'}</Button>
      </div>
    </div>
  )
}

export default DuoBoost
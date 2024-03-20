import { Button } from '@nextui-org/react'
import React from 'react'
import Icon from '@components/icons'
import { OPTIONS } from './Options'

type Props = {
  options: OPTIONS[]
  handleApplyOption: (option: OPTIONS) => void
}

const Streaming = ({ options, handleApplyOption }: Props) => {
  return (
    <div className="flex items-start gap-4">
      <div>
        <Icon name="airplay" color="red" size={50} />
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">Streaming (+15%)</p>
        <p className="font-light text-sm">Enjoy total transparency and monitor your account's progress in real time with our unique booster screen share feature. Enable this option to see what your booster experiences during the Elo Boost process.</p>
      </div>
      <div >
        <Button color={options.includes(OPTIONS.STREAMING) ? 'default' : 'danger'} className="px-16 float-end" onClick={() => handleApplyOption(OPTIONS.STREAMING)}>{options.includes(OPTIONS.STREAMING) ? 'Cancel' : 'Apply'}</Button>
      </div>
    </div>
  )
}

export default Streaming
import { IconProps } from '@iconify/react'
import React from 'react'

type Props = {
  icon: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>
}

const ButtonIcon = ({ icon }: Props) => {
  return (
    <div className="bg-slate-700 hover:cursor-pointer hover:bg-slate-600 p-2 rounded-lg">
      {icon}
    </div>
  )
}

export default ButtonIcon
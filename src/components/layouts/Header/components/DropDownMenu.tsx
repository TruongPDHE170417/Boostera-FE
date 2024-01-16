import React from 'react'
import CustomButton from '../../../common/CustomButton'

type Props = {
  onLogout?: () => void
}

const DropDownMenu = ({ onLogout }: Props) => {
  return (
    <div className="bg-slate-200 rounded-lg h-fit w-52 z-[999]">
      <div className="p-8">
        <p className="font-medium">A4inGJ...ttj</p>
        <div className="flex items-center gap-1 mb-6">
          <span className="text-bold text-md">0.05</span>
          <img src="/icons/solana-icon.png" alt="" className="w-4 h-4" />
          <span className="text-gray-400 font-normal text-sm">~ 1.23$</span>
        </div>
        <div className="flex items-center text-gray-400 font-normal text-sm gap-1">
          <img src="/icons/solana-icon.png" alt="" className="w-4 h-4" />
          = 24.63 USD
        </div>
      </div>
      <div className="border-t border-gray-300 p-4 flex flex-col gap-4">
        <div className="hover hover:bg-slate-300 px-4 py-2 cursor-pointer rounded-md">Owned NFTs</div>
        <div className="hover hover:bg-slate-300 px-4 py-2 cursor-pointer rounded-md">Active offers</div>
        <div className="hover hover:bg-slate-300 px-4 py-2 cursor-pointer rounded-md">Favorites</div>
        <div className="hover hover:bg-slate-300 px-4 py-2 cursor-pointer rounded-md mb-8">Activity</div>
        <CustomButton
          label='Log out'
          onClick={onLogout}
        />
      </div>
    </div>
  )
}

export default DropDownMenu
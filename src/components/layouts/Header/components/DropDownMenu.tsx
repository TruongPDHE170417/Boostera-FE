import React from "react"
import CustomButton from "../../../common/CustomButton"

type Props = {
  onLogout?: () => void
}

const DropDownMenu = ({ onLogout }: Props) => {
  return (
    <div className="z-[999] h-fit w-52 rounded-lg bg-slate-200">
      <div className="p-8 text-center">
        <p className="font-medium">Account Name</p>

        <div className="flex flex-col items-center gap-1 text-center text-sm font-normal text-gray-400">
          <img src="https://p7.hiclipart.com/preview/0/241/241/pepe-the-frog-internet-meme-humour-frog.jpg" alt="avatar" className="h-10 w-10" />
          In-game Name
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-gray-300 p-4">
        <div className="hover cursor-pointer rounded-md px-4 py-2 hover:bg-slate-300">Owned NFTs</div>
        <div className="hover cursor-pointer rounded-md px-4 py-2 hover:bg-slate-300">Active offers</div>
        <div className="hover cursor-pointer rounded-md px-4 py-2 hover:bg-slate-300">Favorites</div>
        <div className="hover mb-8 cursor-pointer rounded-md px-4 py-2 hover:bg-slate-300">Activity</div>
        <CustomButton label="Log out" onClick={onLogout} />
      </div>
    </div>
  )
}

export default DropDownMenu

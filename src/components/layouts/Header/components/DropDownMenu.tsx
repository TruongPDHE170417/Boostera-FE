import React from "react"
import CustomButton from "../../../common/CustomButton"
import { useBoundStore } from "@zustand/total"
import { ROLE_ACCOUNT } from "@models/common"
// const colors = require("tailwindcss/colors")
import colors from "tailwindcss/colors"
import Link from "next/link"
import { Avatar } from "@nextui-org/react"

type Props = {
  onLogout?: () => void
}

const DropDownMenu = ({ onLogout }: Props) => {
  const { accountInfo, removeAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    removeAccountInfo: store.removeAccountInfo,
  }))
  return (
    <div className="z-[999] h-fit w-52 rounded-lg bg-gray-900 text-white">
      <div className="p-8 text-center">
        <p className="font-medium my-2">{accountInfo.username}</p>

        <div className="flex flex-col items-center gap-1 text-center text-sm font-normal text-gray-400">
          <Avatar />
          In-game Name
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-gray-300 p-4">
        {accountInfo.role === ROLE_ACCOUNT.BOOSTER && (
          <div>
            <div className="hover cursor-pointer rounded-md px-4 py-2 hover:bg-white hover:text-black">
              <Link href={"/my-jobs"}>My Jobs</Link>
            </div>
            <div className="hover cursor-pointer rounded-md px-4 py-2 mb-2 hover:bg-white hover:text-black">
              <Link href={"/edit-profile"}>Edit Profile</Link>
            </div>
            <hr
              style={{
                borderColor: colors.gray[100],
                height: "0.5px",
              }}
            />
            <div className="hover cursor-pointer rounded-md px-4 mt-2 py-2 hover:bg-white hover:text-black">
              <Link href={"/messages"}>Messages</Link>
            </div>
          </div>
        )}

        <br />
        <CustomButton label="Log out" onClick={onLogout} customClassName="bg-red-500 hover:bg-red-600" />
      </div>
    </div>
  )
}

export default DropDownMenu

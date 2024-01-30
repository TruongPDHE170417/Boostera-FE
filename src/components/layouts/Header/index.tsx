import React, { memo, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useBoundStore } from "@zustand/total"
import { useClickOutside } from "@hooks/useClickOutside"
import { ROLE_ACCOUNT } from "@models/common"
import GuestNav from "./components/GuestNav"
import BoosterNav from "./components/BoosterNav"
const SCROLL_THRESHOLD = 100

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isTransParent, setIsTransParent] = useState<boolean>(false)
  const [isOpenDropDownMenu, setIsOpenDropDownMenu] = useState<boolean>(false)
  const toggleRef = useRef<HTMLDivElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)

  const { accountInfo, removeAccountInfo, saveAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    removeAccountInfo: store.removeAccountInfo,
    saveAccountInfo: store.saveAccountInfo,
  }))

  useEffect(() => {
    saveAccountInfo({
      userId: null,
      username: "AnPT",
      gmail: "abc@",
      picture: null,
      role: ROLE_ACCOUNT.BOOSTER,
    })
  }, [])

  useClickOutside(dropDownRef, toggleRef, () => setIsOpenDropDownMenu(false))

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= SCROLL_THRESHOLD) {
        setIsTransParent(true)
      } else {
        setIsTransParent(false)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", changeColor)
      }
    }
  }, [])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpenDropDownMenu((prev) => !prev)
  }

  const renderNav = () => {
    switch (accountInfo.role) {
      case ROLE_ACCOUNT.GUEST:
        return <GuestNav />
      case ROLE_ACCOUNT.BOOSTER:
        return <BoosterNav />
      default:
        return null
    }
  }

  return (
    <div
      className={`sticky top-0 z-[999] h-10 ${
        isTransParent ? "bg-black/30 backdrop-blur-lg" : "border-b border-primary-400 bg-theme shadow-lg"
      } z-99 flex w-screen items-center justify-between p-8 text-slate-900`}
    >
      <div className="logo-block flex items-center gap-8">
        <div className="logo">
          <Link href="/">
            <img
              width={60}
              alt="logo"
              src="https://i.kym-cdn.com/entries/icons/original/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.png"
            ></img>
          </Link>
        </div>
        <div className="main-container">
          <Link href="/">
            <p className="text-xl font-bold">
              <span className="text-white">BOOSTERA</span>
            </p>
          </Link>
          <span className="font-bold text-primary-500">LOL ELO BOOST</span>
        </div>
      </div>
      {renderNav()}
    </div>
    // </div>
  )
}

export default memo(Header)

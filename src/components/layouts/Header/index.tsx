import React, { memo, useEffect, useRef, useState } from "react"
import Link from "next/link"
import DropDownMenu from "./components/DropDownMenu"
import SearchInput from "./components/SearchInput"
import { useBoundStore } from "@zustand/total"
import { useClickOutside } from "@hooks/useClickOutside"
import { Key } from "lucide-react"
import { ROLE_ACCOUNT } from "@models/common"
const SCROLL_THRESHOLD = 100

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isTransParent, setIsTransParent] = useState<boolean>(false)
  const [isOpenDropDownMenu, setIsOpenDropDownMenu] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  let isBooster: boolean = false
  const toggleRef = useRef<HTMLDivElement>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)

  const { accountInfo, removeAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    removeAccountInfo: store.removeAccountInfo,
  }))

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
              width={"60px"}
              src="https://i.kym-cdn.com/entries/icons/original/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.png"
            ></img>
          </Link>
        </div>
        <div className="web-name">
          <Link href="/">
            <p className="text-xl font-bold">
              <span className="text-white">BOOSTERA</span>
            </p>
          </Link>
          <span className="font-bold text-primary-500">LOL ELO BOOST</span>
        </div>
        {/* <SearchInput
          placeholder="Search..."
          onChange={setSearchValue}
        /> */}
      </div>
      <div className="flex items-center font-semibold">
        <Link href="/">
          <p className="cursor-pointer rounded-lg px-4 py-2 text-white transition-all delay-[20ms] hover:text-primary-500">
            Prices
          </p>
        </Link>

        <Link href="/boosters">
          <p className="cursor-pointer rounded-lg px-4 py-2 text-white transition-all delay-[20ms] hover:text-primary-500">
            Boosters
          </p>
        </Link>

        <Link href="/boosting-history">
          <p className="cursor-pointer rounded-lg px-4 py-2 text-white transition-all delay-[20ms] hover:text-primary-500">
            Boosting History
          </p>
        </Link>

        {/* BOOSTER -> /jobs; CUSTOMER/GUEST -> become-booster */}
        {accountInfo?.role === ROLE_ACCOUNT.BOOSTER ? (
          <Link href="/jobs">
            <p className="cursor-pointer rounded-lg px-4 py-2 text-white transition-all delay-[20ms] hover:text-primary-500">
              Jobs
            </p>
          </Link>
        ) : (
          <Link href="/become-booster">
            <p className="cursor-pointer rounded-lg px-4 py-2 text-white transition-all delay-[20ms] hover:text-primary-500">
              Jobs
            </p>
          </Link>
        )}

        <div className=" rounded-full bg-primary-100 bg-primary-100 px-4 py-2 hover:bg-primary-500">
          <button className="flex items-center font-light text-white">
            <Key color="white" />
            <span className="pl-1">Log In</span>
          </button>
        </div>

        {/* <div className="relative" ref={toggleRef} onMouseDown={handleMouseDown}>
          {accountInfo?.username?.length !== 0 ? (
            <div className="cursor-pointer rounded-xl border bg-black px-4 py-2 text-sm font-semibold text-white transition-all delay-75 hover:border-black hover:bg-white hover:text-black">
              {accountInfo?.username?.slice(0, 7)} ...
            </div>
          ) : (
            //TODO: update login button
            <div className=" rounded-full bg-primary-100 bg-primary-100 px-4 py-2 hover:bg-primary-500">
              <button className="flex items-center font-light text-white">
                <Key color="white" />
                <span className="pl-1">Log In</span>
              </button>
            </div>
          )}
        </div>

        <div
          className={`absolute right-8 top-16 ${isOpenDropDownMenu ? "menu-show" : "menu-hidden"}`}
          ref={dropDownRef}
        >
          <DropDownMenu onLogout={removeAccountInfo} />
        </div> */}
      </div>
    </div>
  )
}

export default memo(Header)

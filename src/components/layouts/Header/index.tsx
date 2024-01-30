import React, { useState, useEffect, memo, useRef } from "react";
import Link from "next/link";
import DropDownMenu from "./components/DropDownMenu";
import SearchInput from "./components/SearchInput";
import { useBoundStore } from "@zustand/total";
import { useClickOutside } from "@hooks/useClickOutside";

const SCROLL_THRESHOLD = 100;

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isTransParent, setIsTransParent] = useState<boolean>(false);
  const [isOpenDropDownMenu, setIsOpenDropDownMenu] = useState<boolean>(false);

  const toggleRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const { saveAccountInfo, accountInfo, removeAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    removeAccountInfo: store.removeAccountInfo,
    saveAccountInfo: store.saveAccountInfo
  }));

  useClickOutside(dropDownRef, toggleRef, () => setIsOpenDropDownMenu(false));

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= SCROLL_THRESHOLD) {
        setIsTransParent(true);
      } else {
        setIsTransParent(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", changeColor);
      }
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpenDropDownMenu((prev) => !prev);
  };

  return (
    <div
      className={`sticky z-[999] top-0 h-10 ${isTransParent ? "backdrop-blur-lg bg-black/30" : "bg-theme shadow-lg border-b border-primary-400"
        } text-slate-900 flex items-center p-8 justify-between w-screen z-99`}
    >
      <div className="flex gap-8 items-center">
        <Link href="/">
          <p className="font-bold text-xl">
            <span className="text-primary-400">F</span>
            <span className="text-white">Quiz</span>
          </p>
        </Link>

        <SearchInput
          placeholder="Search..."
          onChange={setSearchValue}
        />
      </div>
      <div className="flex gap-8 font-semibold items-center">
        <Link href="/collections">
          <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms] text-white hover:text-black">
            Collections
          </p>
        </Link>
        <Link href="/marketplace">
          <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms] text-white hover:text-black">
            Marketplace
          </p>
        </Link>
        <div className="relative" ref={toggleRef} onMouseDown={handleMouseDown}>
          {accountInfo?.username?.length !== 0 ? (
            //TODO: update login button
            <div className="bg-black rounded-xl text-white font-semibold px-4 py-2 text-sm cursor-pointer hover:bg-white border hover:border-black hover:text-black transition-all delay-75">
              {accountInfo?.username?.slice(0, 7)} ...
            </div>
          ) : (
            <div>Login</div>
          )}
        </div>
        <div
          className={`absolute top-16 right-8 ${isOpenDropDownMenu ? "menu-show" : "menu-hidden"
            }`}
          ref={dropDownRef}
        >
          <DropDownMenu onLogout={removeAccountInfo} />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);

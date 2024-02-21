import { Key } from "lucide-react";
import Link from "next/link"

const GuestNav = () => {
  return (
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
      <Link href="/become-booster">
        <p className="cursor-pointer rounded-lg px-4 py-2 text-white transition-all delay-[20ms] hover:text-primary-500">
          Jobs
        </p>
      </Link>
      <div className=" rounded-full bg-primary-100 bg-primary-100 px-4 py-2 hover:bg-primary-500">
          <button className="flex items-center font-light text-white">
            <Key color="white" />
            <span className="pl-1">Log In</span>
          </button>
        </div>
    </div>
  )
}

export default GuestNav;

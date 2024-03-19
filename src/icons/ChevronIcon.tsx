import clsx from "clsx"
import React from "react"

type Props = {
  isOpen?: boolean
  customClassName?: string
}

const ChevronIcon = ({ isOpen = false, customClassName }: Props) => {
  return (
    <svg
      className={clsx("ml-2.5 h-2.5 w-2.5", isOpen ? "rotate-180" : "", customClassName)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
    </svg>
  )
}

export default ChevronIcon

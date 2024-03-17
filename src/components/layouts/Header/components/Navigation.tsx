import React from 'react'
import { useBoundStore } from '@zustand/total'
import GuestNav from './GuestNav'
import BoosterNav from './BoosterNav'
import { ROLE_ACCOUNT } from '@models/common'

const Navigation = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  if (accountInfo.role === "customer") {
    return <BoosterNav />
  }
  if (accountInfo.role === "guest" || !accountInfo?.role) {
    return <GuestNav />
  }
}

export default Navigation
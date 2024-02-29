import React from 'react'
import { useBoundStore } from '@zustand/total'
import GuestNav from './GuestNav'
import BoosterNav from './BoosterNav'
import { ROLE_ACCOUNT } from '@models/common'

// TODO:  update role nav
const ROLE_NAV = {
  [ROLE_ACCOUNT.GUEST]: <GuestNav />,
  [ROLE_ACCOUNT.CUSTOMER]: <></>,
  [ROLE_ACCOUNT.BOOSTER]: <BoosterNav />,
  [ROLE_ACCOUNT.MANAGER]: <></>,
  [ROLE_ACCOUNT.ADMIN]: <></>,
}

const Navigation = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  return (
    <>
      {accountInfo?.role ? ROLE_NAV[accountInfo.role] : <GuestNav />}
    </>
  )
}

export default Navigation
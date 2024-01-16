"client side"

import React, { useEffect } from "react"
import { Metadata } from "next"
import { useRouter } from "next/router"
import MainLayout from "src/components/layouts/MainLayout"
import ManagementFeedbackScreen from "src/components/screens/ManagementFeedbackScreen"
import useZustandStore from "src/hooks/useZustandStore"
import { useBoundStore } from "src/zustand/total"
import { ROLE_ACCOUNT } from "src/models/common"
import { useSession } from "next-auth/react"

export const metadata: Metadata = {
  title: "Feedback Management",
}

const ManagementFeedback = () => {
  const route = useRouter()
  const { data } = useSession()
  const { accountInfo } = useZustandStore(useBoundStore, (state) => ({
    accountInfo: state.accountInfo,
  }))

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!data?.user?.name || accountInfo.role !== ROLE_ACCOUNT.STAFF) {
        route.push("/498")
      }
    }, 500)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [data, accountInfo])

  return (
    <MainLayout>
      <ManagementFeedbackScreen />
    </MainLayout>
  )
}

export default ManagementFeedback

import React, { useEffect } from "react"
import { Metadata } from "next"
import { useRouter } from "next/router"
import SendFeedbackScreen from "src/components/screens/SendFeedbackScreen"
import MainLayout from "src/components/layouts/MainLayout"
import useZustandStore from "src/hooks/useZustandStore"
import { useBoundStore } from "src/zustand/total"
import { useSession } from "next-auth/react"

export const metadata: Metadata = {
  title: "Feedback",
}

const SendFeedback = () => {
  const route = useRouter()
  const { data } = useSession()
  const { accountInfo } = useZustandStore(useBoundStore, (state) => ({
    accountInfo: state.accountInfo,
  }))

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!data?.user?.name) {
        route.push("/498")
      }
    }, 500)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [data])

  return (
    <MainLayout>
      <SendFeedbackScreen />
    </MainLayout>
  )
}

export default SendFeedback

import React, { useEffect } from "react"
import { Metadata } from "next"
import { useRouter } from "next/router"
import MainLayout from "src/components/layouts/MainLayout"
import MyFeedbackScreen from "src/components/screens/MyFeedbackScreen"
import { useSession } from "next-auth/react"

export const metadata: Metadata = {
  title: "Feedback",
}

const MyFeedback = () => {
  const route = useRouter()
  const { data } = useSession()

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
      <MyFeedbackScreen />
    </MainLayout>
  )
}

export default MyFeedback

import React from "react"
import { Metadata } from "next"
import { useRouter } from "next/router"
import FeedbackDetailScreen from "src/components/screens/FeedbackDetailScreen"

export const metadata: Metadata = {
  title: "Feedback Detail",
}

const Feedback = () => {
  const router = useRouter()
  const { query } = router

  const feedbackId = query.id
  return <FeedbackDetailScreen feedbackId={feedbackId as string} />
}

export default Feedback

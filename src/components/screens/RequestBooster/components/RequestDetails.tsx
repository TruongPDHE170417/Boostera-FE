import { Button } from "@nextui-org/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { API_ENDPOINT, Response } from "@models/api"
import { BoosterRequest } from "@models/booster-request"
import { useBoundStore } from "@zustand/total"

const RequestDetails = () => {
  const router = useRouter()
  const requestId = router.query.requestId
  const [requestDetails, setRequestDetails] = useState<BoosterRequest>()

  const { authInfo } = useBoundStore((store) => ({
    authInfo: store.authInfo,
  }))

  console.log(authInfo.accessToken)

  useEffect(() => {
    const getRequestById = async () => {
      try {
        const response = await fetch(API_ENDPOINT + `/become-booster/${requestId}`)
        if (!response.ok) {
          console.error("Error to get request by ID")
        }
        const jsonData = (await response.json()) as Response<BoosterRequest>
        setRequestDetails(jsonData.data[0])
      } catch (error) {
        console.error("Error fetching requests:", error)
      }
    }
    if (requestId) {
      getRequestById()
    }
  }, [requestId])

  const route = useRouter()

  const handleApprove = async () => {
    try {
      const requestBody = {
        status: "approved",
      }
      const response = await fetch(API_ENDPOINT + `/become-booster/review-request/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      })
      route.push("/list-of-requests")
    } catch (error) {
      console.error("Error approving request:", error)
    }
  }
  
  const handleReject = async () => {
    try {
      const requestBody = {
        status: "rejected",
      }
      const response = await fetch(API_ENDPOINT + `/become-booster/review-request/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      })
      route.push("/list-of-requests")
    } catch (error) {
      console.error("Error approving request:", error)
    }
  }
  return (
    <div>
      <h1>Request Details</h1>
      {requestDetails && requestId ? (
        <div>
          <p>Nickname: {requestDetails?.nickname}</p>
          <p>Game Name: {requestDetails?.gameName}</p>
          <p>Tag Line: {requestDetails?.tagLine}</p>
          <p>About: {requestDetails?.about}</p>
          <p>Country: {requestDetails?.country}</p>
          <p>Email: {requestDetails?.email}</p>
          <p>Status: {requestDetails?.status}</p>
          <Button onClick={handleApprove} style={{ color: "white", backgroundColor: "green" }}>
            Approve
          </Button>
          <Button onClick={handleReject} style={{ color: "white", backgroundColor: "red" }}>
            Reject
          </Button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default RequestDetails

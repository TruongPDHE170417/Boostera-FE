import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { BoosterRequest } from "@models/booster-request"
import { Button } from "@nextui-org/react"
import { green, white } from "tailwindcss/colors"

const RequestDetails = () => {
  const router = useRouter()
  const requestId = router.query.requestId
  const [requestDetails, setRequestDetails] = useState<BoosterRequest>()

  useEffect(() => {
    const getRequestById = async () => {
      try {
        const response = await fetch(`http://localhost:9999/become-booster/${requestId}`)
        if (!response.ok) {
          console.error("Error to get request by ID")
        }
        const jsonData = (await response.json()) as { message: string; data: BoosterRequest }
        setRequestDetails(jsonData.data[0]);
      } catch (error) {
        console.error("Error fetching requests:", error)
      }
    }
    if (requestId) {
      getRequestById()
    }
  }, [requestId])
  
  const handleApprove = async () => {
    try {
      const response = await fetch(`http://localhost:9999/become-booster/review-request/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })
      console.log(response);
    } catch (error) {
      console.error("Error approving request:", error)
    }
  }
  // Function to handle rejection
  const handleReject = () => {
    // You can implement the logic to reject the request here
    console.log("Request rejected")
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

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
        const response = await fetch(API_ENDPOINT + `/become-booster/${requestId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authInfo.accessToken}`,
          },
        })
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
  const handleApproveOrReject = async (status: string) => {
    try {
      const requestBody = { status }
      const response = await fetch(API_ENDPOINT + `/become-booster/review-request/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      })
      if (response.ok) {
        route.push("/management/list-of-requests")
      } else {
        console.error(`Error ${status === "approved" ? "approving" : "rejecting"} request`)
      }
    } catch (error) {
      console.error(`Error ${status === "approved" ? "approving" : "rejecting"} request:`, error)
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#283347",
        marginLeft: "50px",
        marginRight: "50px",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <h1 className="m-5 text-center text-3xl font-bold">Request Details</h1>
      {requestDetails && requestId ? (
        <div className="p-10">
          <p className=" m-5">
            <span className="text-l font-bold">Nickname:</span> {requestDetails.nickname}
          </p>
          <p className=" m-5">
            <span className="text-l font-bold">Game Name:</span> {requestDetails.gameName}
          </p>
          <p className=" m-5">
            <span className="text-l font-bold">Tag Line:</span> {requestDetails.tagLine}
          </p>
          <p className=" m-5">
            <span className="text-l font-bold">About:</span> {requestDetails.about}
          </p>
          <p className=" m-5">
            <span className="text-l font-bold">Country:</span> {requestDetails.country}
          </p>
          <p className=" m-5">
            <span className="text-l font-bold">Email:</span> {requestDetails.email}
          </p>
          <p className=" m-5">
            <span className="text-l font-bold">Status: {requestDetails.status}</span>
          </p>
          <div>
            <Button
              onClick={() => handleApproveOrReject("approved")}
              style={{ backgroundColor: "green", color: "white" }}
              className="ml-5 mr-2 p-5 font-bold"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleApproveOrReject("rejected")}
              style={{ backgroundColor: "red", color: "white" }}
              className="p-5 font-bold"
            >
              Reject
            </Button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default RequestDetails

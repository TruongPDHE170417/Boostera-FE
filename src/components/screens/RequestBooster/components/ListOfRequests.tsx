import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { BoosterRequest, REQUEST_STATUS } from "@models/booster-request"

const RequestsList = () => {
  const router = useRouter()
  const [requests, setRequests] = useState<BoosterRequest[]>([])

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const response = await fetch("http://localhost:9999/become-booster/get-all")
        if (!response.ok) {
          throw new Error("Failed to fetch requests")
        }
        const jsonData = (await response.json()) as { message: string; data: BoosterRequest[] }
        setRequests(jsonData.data)
      } catch (error) {
        console.error("Error fetching requests:", error)
      }
    }

    getAllRequests()
  }, [])

  const reviewRequest = (requestId: string) => {
    router.push(`/request-details/?requestId=${requestId}`)
  }

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NICKNAME</TableColumn>
        <TableColumn>IGN</TableColumn>
        <TableColumn>TAG</TableColumn>
        <TableColumn>ABOUT</TableColumn>
        <TableColumn>COUNTRY</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {requests.map((request, index) => (
          <TableRow key={index}>
            <TableCell>{request.nickname}</TableCell>
            <TableCell>{request.gameName}</TableCell>
            <TableCell>{request.tagLine}</TableCell>
            <TableCell>{request.about}</TableCell>
            <TableCell>{request.country}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell
              style={{
                color:
                  request.status === REQUEST_STATUS.SUBMITTED
                    ? "gray"
                    : request.status === REQUEST_STATUS.APPROVED
                      ? "green"
                      : request.status === REQUEST_STATUS.REJECTED
                        ? "red"
                        : "black",
              }}
            >
              {request.status === REQUEST_STATUS.SUBMITTED ? (
                <Button onClick={() => reviewRequest(request._id)}>Review Request</Button>
              ) : (
                request.status
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RequestsList

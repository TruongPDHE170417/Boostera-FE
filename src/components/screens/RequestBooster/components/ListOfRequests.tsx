import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import colors from "tailwindcss/colors"
import { BoosterRequest, REQUEST_STATUS } from "@models/booster-request"
import Link from "next/link"
import { Key } from "lucide-react"
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
    <div>
      <h1 className="m-5 text-center text-3xl font-bold">Unresolved Booster Request</h1>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="bg-theme text-white">#</TableColumn>
          <TableColumn className="bg-theme text-white">NICKNAME</TableColumn>
          <TableColumn className="bg-theme text-white">IGN</TableColumn>
          <TableColumn className="bg-theme text-white">TAG</TableColumn>
          <TableColumn className="bg-theme text-white">ABOUT</TableColumn>
          <TableColumn className="bg-theme text-white">COUNTRY</TableColumn>
          <TableColumn className="bg-theme text-white">EMAIL</TableColumn>
          <TableColumn className="bg-theme text-white">STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
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
                  <Button className="bg-red-400 text-white hover:bg-red-700" onClick={() => reviewRequest(request._id)}>
                    Review Request
                  </Button>
                ) : (
                  request.status
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RequestsList

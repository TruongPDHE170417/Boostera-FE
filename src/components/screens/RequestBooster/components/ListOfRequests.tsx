import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const RequestsList = () => {
  const router = useRouter()
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const response = await fetch("http://localhost:9999/become-booster/get-all")
        if (!response.ok) {
          throw new Error("Failed to fetch requests")
        }
        const jsonData = await response.json()
        setRequests(jsonData.data)
      } catch (error) {
        console.error("Error fetching requests:", error)
      }
    }

    getAllRequests()
  }, [])

  const reviewRequest = (id) => {
    router.push(`/request-details/${id}`)
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
            <TableCell>{request.IGN}</TableCell>
            <TableCell>{request.tag}</TableCell>
            <TableCell>{request.about}</TableCell>
            <TableCell>{request.country}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell
              style={{
                color:
                  request.status === "submitted"
                    ? "gray"
                    : request.status === "accepted"
                      ? "green"
                      : request.status === "rejected"
                        ? "red"
                        : "black",
              }}
            >
              {request.status === "submitted" ? (
                <Button onClick={() => reviewRequest(request._id)}>Wait for approval</Button>
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

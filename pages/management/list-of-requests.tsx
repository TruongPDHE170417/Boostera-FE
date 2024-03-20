import React from "react"
import MainLayout from "@components/layouts/MainLayout"
import RequestsList from "@components/screens/RequestBooster/components/ListOfRequests"
import withAuth from "@components/layouts/withAuth"

const ListOfRequestsPage = () => {
  return (
    <MainLayout>
      <RequestsList />
    </MainLayout>
  )
}
// export default withAuth(ListOfRequestsPage, ["manager"])
export default ListOfRequestsPage
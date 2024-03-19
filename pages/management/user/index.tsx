import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import ManageUserScreen from '@components/screens/ManageUser'
import withAuth from '@components/layouts/withAuth'

const Report = () => {
  return (
    <MainLayout>
      <ManageUserScreen />
    </MainLayout>
  )
}

export default withAuth(Report, ['admin, manager'])
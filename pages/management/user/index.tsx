import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import withAuth from '@components/layouts/withAuth'
import ManageUserScreen from '@components/screens/ManageUser'

const Report = () => {
  return (
    <MainLayout>
      <ManageUserScreen />
    </MainLayout>
  )
}

export default withAuth(Report, ['admin, manager'])
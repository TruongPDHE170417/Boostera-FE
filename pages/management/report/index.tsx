import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import withAuth from '@components/layouts/withAuth'
import ReportScreen from '@components/screens/Report'

const Report = () => {
  return (
    <MainLayout>
      <ReportScreen />
    </MainLayout>
  )
}

export default withAuth(Report, ['admin, manager'])
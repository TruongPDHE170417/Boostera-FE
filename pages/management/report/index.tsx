import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import ReportScreen from '@components/screens/Report'
import withAuth from '@components/layouts/withAuth'

const Report = () => {
  return (
    <MainLayout>
      <ReportScreen />
    </MainLayout>
  )
}

export default withAuth(Report, ['admin, manager'])
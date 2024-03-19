import dynamic from 'next/dynamic'
import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import MyJobsScreen from '@components/screens/MyJobs'

const MyJobsPage = () => {
  return (
    <MainLayout title='My Jobs'>
      <MyJobsScreen />
    </MainLayout>
  )
}

export default MyJobsPage
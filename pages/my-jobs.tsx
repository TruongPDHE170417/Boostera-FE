import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import dynamic from 'next/dynamic'

const MyJobsScreen = dynamic(() => import("../src/components/screens/MyJobs").then(mod => mod.default), {
  ssr: false,
})


const MyJobsPage = () => {
  return (
    <MainLayout title='My Jobs'>
      <MyJobsScreen />
    </MainLayout>
  )
}

export default MyJobsPage
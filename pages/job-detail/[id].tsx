import React from 'react'
import { useRouter } from 'next/router'
import MainLayout from '@components/layouts/MainLayout'
import JobDetailScreen from '@components/screens/JobDetail'

const JobDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <MainLayout title='Job Detail'>
      <JobDetailScreen jobId={id as string} />
    </MainLayout>
  )
}

export default JobDetailPage
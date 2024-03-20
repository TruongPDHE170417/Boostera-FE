import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '@components/layouts/MainLayout'
import JobDetailScreen from '@components/screens/JobDetail'

const JobDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <MainLayout title='Job Detail'>
      {id && <JobDetailScreen jobId={id as string} />}
    </MainLayout>
  )
}

export default JobDetailPage
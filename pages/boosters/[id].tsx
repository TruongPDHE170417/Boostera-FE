import React from 'react'
import { useRouter } from 'next/router'
import MainLayout from '@components/layouts/MainLayout'
import BoosterDetail from '@components/screens/BoosterDetail'

const BoosterDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <MainLayout title='Booster Detail'>
      <BoosterDetail boosterId={id as string} />
    </MainLayout>
  )
}

export default BoosterDetailPage
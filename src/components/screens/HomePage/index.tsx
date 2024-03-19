import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

const HomePageScreen = () => {
  const router = useRouter();
  const moveToPrice = () => {
    router.push('/prices');
  }
  return (
    <div className="w-screen h-screen bg-theme text-white relative flex justify-center items-center">
      <img src='/images/get-started.jpg' width="100%" height="100%" alt="get started" />
      <Button className="absolute px-12 py-8 font-semibold text-lg shadow-xl" color="danger" onClick={moveToPrice}>Get Started</Button>
    </div>
  )
}

export default HomePageScreen
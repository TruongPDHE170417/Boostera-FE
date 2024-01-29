import React from 'react'
import BoosterCard from './components/BoosterCard'
import Pagination from './components/BoosterPagination'
import Tabs from './components/BoosterTabs'

const BoosterPageScreen = () => {
  return (
    <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-80 w-screen bg-theme">
      <Tabs />
      <BoosterCard />
      <Pagination />
    </div>
  )
}

export default BoosterPageScreen
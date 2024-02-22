import React from 'react'
import BoosterCard from './components/BoosterCard'
import Pagination from './components/BoosterPagination'
import Tabs from './components/BoosterTabs'
import Intro from './components/Intro';
import Overview from './components/Overview';


const BoosterPageScreen = () => {
  return (
    <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-80 w-screen bg-theme">
      <Intro/>
      <Overview />
      <div className="container w-[75%] mx-auto px-4">
        <Tabs />
        <BoosterCard />
        <Pagination />
      </div>
    </div>
  )
}

export default BoosterPageScreen


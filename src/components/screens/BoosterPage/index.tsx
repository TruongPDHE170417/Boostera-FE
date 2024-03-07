import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '@models/api';
import { Booster } from '@models/booster';
import BoosterCard from './components/BoosterCard'
import Pagination from './components/BoosterPagination'
import Tabs from './components/BoosterTabs'
import Intro from './components/Intro';
import Overview from './components/Overview';


const BoosterPageScreen = () => {

  const [boosters, setBoosters] = useState<Booster[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        const handleGetBoosterList = async () => {
            const response = await fetch(`${API_ENDPOINT}/boosters/`);
            const data = await response.json() as Booster[];
            setBoosters(data);
        };

        handleGetBoosterList();
    }, []);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = boosters.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const total = Math.ceil(boosters.length / ITEMS_PER_PAGE);

  return (
    <div className="py-24 md:px-12 lg:px-16 xl:px-80 w-screen bg-theme">
      <Intro />
      <Overview />
      <div className="container mx-auto px-[15%]">
        <BoosterCard boosters={currentItems}/>
        <Pagination total={total} onPageChange={handlePageChange}/>
      </div>
    </div>
  )
}

export default BoosterPageScreen


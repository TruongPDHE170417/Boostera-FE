import { Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '@models/api';
import { Booster } from '@models/booster';
import BoosterCard from './components/BoosterCard'
import Pagination from './components/BoosterPagination'
import Intro from './components/Intro';
import Overview from './components/Overview';

const ITEMS_PER_PAGE = 9;

const BoosterPageScreen = () => {

  const [boosters, setBoosters] = useState<Booster[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleGetBoosterList = async () => {
      const response = await fetch(`${API_ENDPOINT}/boosters/`);
      const data = await response.json() as Booster[];
      setBoosters(data);
      setLoading(false);
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

  if (isLoading) {
    return <Spinner color="primary" size="lg" className="w-[100%] h-[100%]" />;
}

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


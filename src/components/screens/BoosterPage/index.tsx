import React from 'react';
import Overview from './components/Overview';
import Intro from './components/Intro';
const BoosterPageScreen = () => {
  return (
    <>
    
      <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-80 w-screen bg-theme">
        <Intro/>
      <Overview />
      </div>
      
    </>
  );
};

export default BoosterPageScreen;

import React from "react"

const Overview = () => {
  return (
    <div className="flex w-full flex-col font-sans" style={{ backgroundImage: `url('/images/boosteria_background.webp')` }}>
      <div className="grid h-20 place-items-center text-center text-3xl font-semibold text-white">
        <h1>Kickstart Your Career as a LoL Booster with Boosteria!</h1>
      </div>
      <div className="mx-32 -mt-2 mb-5 grid  h-20 place-items-center px-10 text-center text-xl text-gray-300">
        <p>
          Turn your passion for League of Legends into a career by joining our LoL boosting team! We&apos;re
          continuously searching for talented players to aid our clients in reaching their desired ranks. Apply today,
          and if you possess the skills we&apos;re looking for, we&apos;ll contact you through Discord.
        </p>
      </div>
    </div>
  )
}

export default Overview

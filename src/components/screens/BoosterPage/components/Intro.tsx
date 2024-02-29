import { NextPage } from "next";
import React from "react";

const Intro: NextPage = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-59 box-border max-w-full mb-24">
      <header className="flex-1 flex flex-col items-center justify-start pt-33 pb-27 pr-31 pl-5 box-border gap-30 bg-header-image bg-cover bg-no-repeat bg-top mix-blend-normal max-w-full text-center text-5xl text-white font-roboto">

        <div className="flex flex-row items-start justify-start px-10 box-border max-w-full">
          <div className="flex flex-col items-center justify-start gap-10 max-w-full">
            <h1 className="m-0 leading-34 ">
              Meet Our Exceptional LoL Elo Boosters - The Crème de la Crème at
              Boosteria
            </h1>
            <div className="flex flex-col items-center justify-start gap-10 max-w-full text-lg text-whitesmoke">
              <div className="w-24 h-1 relative rounded-sm bg-crimson-200 mix-blend-normal" />
              <div className="flex flex-col items-center justify-start py-0 pr-17 pl-0 opacity-70 mix-blend-normal">
                <div className="leading-24 font-light whitespace-pre-line">
                  Check out our elite LoL Elo boosters' profiles!
                  Delve into their ranks, bios, reviews, and past boosts for a first-hand look at their skills.
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Intro;

import React from "react";
export default function App() {
    
    return (
        <main className="  elf-stretch flex flex-col items-center justify-start gap-[10px] max-w-full shrink-0 text-left text-sm text-dimgray-100 font-roboto">
        <div className="w-[785px] flex flex-row items-center justify-start py-0 px-5 box-border gap-[37px] max-w-full mq450:gap-[18px] mq750:flex-wrap mb-24">
            
          <div className="w-[248px] flex flex-col items-start justify-start pt-0 px-0 pb-2.5 box-border min-w-[248px] mq750:flex-1">
            <div className="self-stretch flex flex-row items-center justify-start gap-[15px]">
              <div className="flex flex-col items-start justify-start gap-[50px]">
                <img
                  className="w-[50px] h-[50px] relative mix-blend-normal"
                  alt=""
                  src="images/svg-1.svg"
                />
                <img
                  className="w-[50px] h-[50px] relative mix-blend-normal"
                  alt=""
                  src="images/svg-2.svg"
                />
                <img
                  className="w-[50px] h-[50px] relative mix-blend-normal"
                  alt=""
                  src="images/svg-3.svg"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[42px]">
                <div className="flex flex-col items-start justify-start">
                  <div className=" text-white relative leading-[21px]">
                    Boosters in Team
                  </div>
                  <b className="relative text-xl leading-[36px] text-white mq450:text-lgi mq450:leading-[29px]">
                    105
                  </b>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[1px]">
                  <div className="relative text-white leading-[21px]">Last Boost</div>
                  <h3 className="m-0 relative text-xl leading-[36px] font-bold font-inherit text-white mq450:text-lgi mq450:leading-[29px]">
                    about 1 hour ago
                  </h3>
                </div>
                <div className="text-white flex flex-col items-start justify-start gap-[1px]">
                  <div className="relative leading-[21px]">Average Rating</div>
                  <b className="relative text-xl leading-[36px] text-white mq450:text-lgi mq450:leading-[29px]">
                    4.9
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[15px] min-w-[299px] max-w-full text-base text-white">
            <div className=" hover:bg-sky-700 self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-center justify-between py-0 pr-1 pl-[3px] gap-[20px] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[9px]">
                  <b className="relative leading-[21px]">43.81%</b>
                  <div className="h-[17px] flex flex-row items-end justify-end pt-0 px-0 pb-0 box-border opacity-[0.5] mix-blend-normal text-sm">
                    <div className="relative leading-[21px] font-light">
                      46 Boosters
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-[11px] text-sm text-white">
                  <img
                    className="h-[30px] w-[35px] relative object-cover mix-blend-normal"
                    alt=""
                    src="images/td.png"
                  />
                  <b className="relative leading-[24px] capitalize">
                    Challenger
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-10xs bg-dimgray-200 flex flex-row items-center justify-start py-0 px-px mix-blend-normal">
                <div className="h-1.5 w-[201.5px] relative rounded-10xs bg-crimson-200 mix-blend-normal" />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-center justify-between py-0 pr-1 pl-[3px] gap-[20px] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[9px]">
                  <b className="relative leading-[21px]">22.86%</b>
                  <div className="h-[17px] flex flex-row items-end justify-end pt-0 px-0 pb-0 box-border opacity-[0.5] mix-blend-normal text-sm">
                    <div className="relative leading-[21px] font-light">
                      24 Boosters
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-[11px] text-sm text-white">
                  <img
                    className="h-[30px] w-[35px] relative object-cover mix-blend-normal"
                    alt=""
                    src="images/grand.png"
                  />
                  <b className="relative leading-[24px] capitalize">
                    GrandMaster
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-10xs bg-dimgray-200 flex flex-row items-center justify-start py-0 px-px mix-blend-normal">
                <div className="h-1.5 w-[105.2px] relative rounded-10xs bg-crimson-200 mix-blend-normal" />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-center justify-between py-0 pr-[5px] pl-[3px] gap-[20px] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[9px]">
                  <b className="relative leading-[21px]">18.1%</b>
                  <div className="h-[17px] flex flex-row items-end justify-end pt-0 px-0 pb-0 box-border opacity-[0.5] mix-blend-normal text-sm">
                    <div className="relative leading-[21px] font-light">
                      19 Boosters
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start py-0 pr-px pl-0 gap-[10px] text-sm text-white">
                  <img
                    className="h-[30px] w-[35px] relative object-cover mix-blend-normal"
                    alt=""
                    src="images/M.png"
                  />
                  <b className="relative leading-[24px] capitalize">Master</b>
                </div>
              </div>
              <div className="self-stretch rounded-10xs bg-dimgray-200 flex flex-row items-center justify-start py-0 px-px mix-blend-normal">
                <div className="h-1.5 w-[83.3px] relative rounded-10xs bg-crimson-200 mix-blend-normal" />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-center justify-between py-0 px-1 gap-[20px] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[9px]">
                  <b className="relative leading-[21px]">1.9%</b>
                  <div className="h-4 flex flex-row items-end justify-end pt-0 px-0 pb-0 box-border opacity-[0.5] mix-blend-normal text-sm">
                    <div className="relative leading-[21px] font-light">
                      2 Boosters
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-[11px] text-sm text-white">
                  <img
                    className="h-[30px] w-[35px] relative object-cover mix-blend-normal"
                    alt=""
                    src="images/dia.png"
                  />
                  <b className="relative leading-[24px] capitalize">
                    Diamond 1
                  </b>
                </div>
              </div>
              <div className="self-stretch h-1.5 relative rounded-10xs bg-dimgray-200 mix-blend-normal">
                <div className="absolute top-[-0.5px] left-[1px] rounded-10xs bg-crimson-200 w-[8.7px] h-1.5 mix-blend-normal" />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-center justify-between py-0 pr-[5px] pl-[3px] gap-[20px] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[9px]">
                  <b className="relative leading-[21px]">13.33%</b>
                  <div className="h-[17px] flex flex-row items-end justify-end pt-0 px-0 pb-0 box-border opacity-[0.5] mix-blend-normal text-sm">
                    <div className="relative leading-[21px] font-light">
                      14 Boosters
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start py-0 pr-px pl-0 gap-[10px] text-sm text-white">
                  <img
                    className="h-[30px] w-[35px] relative object-cover mix-blend-normal"
                    alt=""
                    src="images/dia.png"
                  />
                  <b className="relative leading-[24px] capitalize">
                    Diamond 4+
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-10xs bg-dimgray-200 flex flex-row items-center justify-start py-0 px-px mix-blend-normal">
                <div className="h-1.5 w-[61.3px] relative rounded-10xs bg-crimson-200 mix-blend-normal" />
              </div>
            </div>
          </div>
        </div>

      </main>
    );
}

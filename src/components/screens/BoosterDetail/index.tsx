import React, { useEffect, useState } from "react";
import {Avatar, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { API_ENDPOINT } from "@models/api";
import {Booster} from "@models/booster";
import {calculateDaysDifferent} from "@utils/dateCalculate";
import {capitalizeFirstLetter} from "@utils/format";

type Props = {
    boosterId: string
}

const BoosterDetail = ({boosterId}: Props) => {
    const [booster, setBooster] = useState<Booster>();
    const [lastBoost, setLastBoost] = useState<string>("Not yet");

    useEffect(() => {
        const handleGetBoosterDetail = async () => {
            if (boosterId) {
                const response = await fetch(`${API_ENDPOINT}/boosters/${boosterId}`);
                const data = await response.json() as Booster;
                setBooster(data);
            }
        };
      
        handleGetBoosterDetail();

        const handleGetLastBoost = async () => {
            //TODO: Get last boost
        }
    }, [boosterId]);

    return (
        <div className="py-24 md:px-12 lg:px-16 xl:px-80 w-screen flex flex-col gap-5 bg-contentbg">
              <div className="container mx-auto px-[30%] flex flex-col items-center gap-5 text-white">
                {/* Booster Avatar */}
                <Avatar 
                    className="w-[15%] h-auto"
                    isBordered color="danger"
                    src="/images/default-user-img.jpg" />

                <h1 className="font-bold text-4xl">{booster?.user.name}</h1>
                {/* Booster Rank */}
                <div className="flex justify-center items-center gap-3">
                    <Image
                        width={65}
                        alt="Rank"
                        src={`/images/${booster?.rank}.png`}
                    />
                    <p className="font-bold text-2xl">{booster && capitalizeFirstLetter(booster.rank)}</p>
                </div>
                {/* Booster's Bio */}
                <p className="text-gray-400">{booster?.bio}</p>

                {/* Booster metrics */}
                <div className="w-[100%] flex justify-between">
                    <div>
                        <p className="text-gray-400">Completed Boosts:</p>
                        <p className="font-bold text-2xl">{booster?.completedBoost}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Last Boost:</p>
                        <p className="font-bold text-2xl">{lastBoost}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">On Boosteria:</p>
                        <p className="font-bold text-2xl">{booster && calculateDaysDifferent(booster?.createdAt)}</p>
                    </div>
                </div>
              </div>
              {/* TODO: Add a table for the booster's rank history after get job endpoint finised */}
              <div className="flex justify-center">
                <Table className="w-[75%] dark text-foreground" isStriped aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>From Rank</TableColumn>
                            <TableColumn>To Rank</TableColumn>
                            <TableColumn>Date</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>
                                    <div className="flex gap-3">
                                        <Image
                                            width={50}
                                            alt="Rank"
                                            src="/images/master.png"
                                        />
                                        <p className="font-bold text-2xl">Master</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <Image
                                            width={50}
                                            alt="Rank"
                                            src="/images/grandmaster.png"
                                        />
                                        <p className="font-bold text-2xl">Master</p>
                                    </div>
                                </TableCell>
                                <TableCell>05/05/2024</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>
                                    <div className="flex gap-3">
                                        <Image
                                            width={50}
                                            alt="Rank"
                                            src="/images/master.png"
                                        />
                                        <p className="font-bold text-2xl">Master</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <Image
                                            width={50}
                                            alt="Rank"
                                            src="/images/grandmaster.png"
                                        />
                                        <p className="font-bold text-2xl">Master</p>
                                    </div>
                                </TableCell>
                                <TableCell>05/05/2024</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
              </div>
        </div>
    );
}

export default BoosterDetail;
import {Avatar, Image, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "@models/api";
import {Booster} from "@models/booster";
import {calculateDaysDifferent} from "@utils/dateCalculate";
import {capitalizeFirstLetter, formatBsonDate} from "@utils/format";
import { convertRankToImageName } from "@utils/image";
import { Job } from "@models/job";

type Props = {
    boosterId: string
}

const BoosterDetail = ({boosterId}: Props) => {
    const [booster, setBooster] = useState<Booster>();
    const [boostHistory, setBoostHistory] = useState<Job[]>([])
    const [lastBoost, setLastBoost] = useState<string>("Not yet");
    const [numberOfBoost, setNumberOfBoost] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(true);

    const router = useRouter();

const to404 = () => {
    const currentPath = router.asPath;
    void router.push(`${currentPath}/404`);
}

    useEffect(() => {     
        const handleGetBoosterDetail = async () => {
            if (boosterId) {
                const response = await fetch(`${API_ENDPOINT}/boosters/${boosterId}`);
                const data = await response.json() as Booster;
                if(response.ok && data) {
                    setBooster(data);
                    setLoading(false);
                } else {
                    to404();
                }
            }
        };
        handleGetBoosterDetail();

        const getMostRecentJob = (boostHistory: Job[]) => {
            const sortedJobs = boostHistory.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return sortedJobs[0];
        }

        const handleGetLastBoost = async () => {
            if (boosterId) {
                const response = await fetch(`${API_ENDPOINT}/job/by-booster/${boosterId}`);
                const data = await response.json() as Job[];
                if (response.ok && Array.isArray(data) && data.length > 0) {
                    setBoostHistory(data);
                    setLastBoost(calculateDaysDifferent(getMostRecentJob(data)?.createdAt ?? ""));
                    setNumberOfBoost(data.length);
                } else {
                    setLastBoost("Not yet");
                }
            }
        };
        handleGetLastBoost();
        
    }, [boosterId]);

    if (isLoading) {
        return <Spinner color="primary" size="lg" className="w-[100%] h-[100%]" />;
    }

    return (
        <div className="py-24 md:px-12 lg:px-16 xl:px-80 w-screen flex flex-col gap-5 bg-contentbg">
              <div className="container mx-auto px-[30%] flex flex-col items-center gap-5 text-white">
                {/* Booster Avatar */}
                <Avatar 
                    className="w-[15%] h-auto"
                    isBordered color="danger"
                    src={booster?.avatarUrl} />

                <h1 className="font-bold text-4xl">{booster?.nickname}</h1>
                {/* Booster Rank */}
                <div className="flex justify-center items-center gap-3">
                    <Image
                        width={65}
                        alt="Rank"
                        src={`/images/${convertRankToImageName(booster?.currentRankSolo.currentLeague ?? "")}.png`}
                    />
                    <p className="font-bold text-2xl">{booster && capitalizeFirstLetter(booster?.currentRankSolo.currentLeague)}</p>
                </div>
                {/* Booster metrics */}
                <div className="w-[100%] flex justify-between">
                    <div>
                        <p className="text-gray-400">Completed Boosts:</p>
                        <p className="font-bold text-2xl">{numberOfBoost}</p>
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
              {numberOfBoost > 0 ?
              <div className="flex justify-center">
                <Table className="w-[75%] dark text-foreground" isStriped aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn className="text-xl">From Rank</TableColumn>
                            <TableColumn className="text-xl">To Rank</TableColumn>
                            <TableColumn className="text-xl">Date</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {boostHistory?.map((job, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="flex gap-3 items-center">
                                        <Image
                                            width={50}
                                            alt="Rank"
                                            src={`/images/${convertRankToImageName(job.fromLeague)}.png`}
                                        />
                                        <p className="font-bold text-2xl">{capitalizeFirstLetter(job.fromLeague)} {job.fromDivision}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-3 items-center">
                                        <Image
                                            width={50}
                                            alt="Rank"
                                            src={`/images/${convertRankToImageName(job.toLeague)}.png`}
                                        />
                                        <p className="font-bold text-2xl">{capitalizeFirstLetter(job.toLeague)} {job.toDivision}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="font-bold text-2xl">{formatBsonDate(job.createdAt)}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
              </div> : <></>}
              
        </div>
    );
}

export default BoosterDetail;
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Booster } from "@models/booster";
import { calculateDaysDifferent } from "@utils/dateCalculate";
import { capitalizeFirstLetter } from "@utils/format";
import { convertRankToImageName } from "@utils/image";
import { Job } from "@models/job";
import { API_ENDPOINT } from "@models/api";

type Props = {
    boosters: Booster[];
}

const COMPLETED_JOB_STATUS = ["Request Withdrawal", "Withdrawn"];

export default function BoosterCard({boosters}: Props) {
    const [completedBoosts, setCompletedBoosts] = useState<number[]>([]);

    useEffect(() => {
        const fetchCompletedBoosts = async () => {
            const boosts = await Promise.all(boosters.map(async (booster) => {
                const response = await fetch(`${API_ENDPOINT}/job/by-booster/${booster._id}`);
                const data = await response.json() as Job[];
                return data.filter((job: any) => COMPLETED_JOB_STATUS.includes(job.status)).length;
            }));
            setCompletedBoosts(boosts);
        };
        fetchCompletedBoosts();
    }, [boosters]);

    const router = useRouter()

    const toBoosterDetail = (id: string) => {
        void router.push(`/boosters/${id}`)
    }

    return (
        <div className="gap-8 grid grid-cols-3 sm:grid-cols-3">
            {boosters.map((booster, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => toBoosterDetail(booster._id)}>
                    <CardBody className="overflow-hidden p-0 h-[350px]">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={booster.currentRankSolo.currentLeague}
                            className="object-cover"
                            src={booster.avatarUrl}
                        />
                    </CardBody>
                    <CardFooter className="flex-col text-white bg-gradient-to-r from-[#202832] to-[#283347]">
                        <div className="flex w-[90%] justify-between">
                            <b className=" text-3xl">{booster.nickname}</b>
                            <div className="flex items-center gap-3">
                                <Image
                                    width="100%"
                                    height="100%"
                                    className="h-[50px] w-[50px]"
                                    src={`/images/${convertRankToImageName(booster.currentRankSolo.currentLeague)}.png`} alt={booster.currentRankSolo.currentLeague}
                                />
                                <p className="text-lg font-bold">{capitalizeFirstLetter(booster.currentRankSolo.currentLeague)}</p>
                            </div>
                        </div>
                        <div className="flex w-[90%] justify-between">
                            <b className="text-lg">Languages</b>
                            <p className="font-bold text-xl">{booster.languages}</p>
                        </div>
                        <div className="flex w-[90%] justify-between">
                            <b className="text-lg">Completed Boost</b>
                            <p className="font-bold text-xl">{completedBoosts[index]}</p>
                        </div>
                        <div className="flex w-[90%] justify-between">
                            <b className="text-lg">On Boostera</b>
                            <p className="font-bold text-xl">{calculateDaysDifferent(booster.createdAt)}</p>
                        </div>
                        <Button color="danger" className="w-full font-bold" onClick={() => toBoosterDetail(booster._id)}>
                            View Profile
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

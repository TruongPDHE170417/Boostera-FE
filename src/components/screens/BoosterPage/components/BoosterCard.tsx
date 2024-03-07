import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "@models/api";
import { Booster } from "@models/booster";
import { calculateDaysDifferent } from "@utils/dateCalculate";
import { capitalizeFirstLetter } from "@utils/format";
import { useRouter } from "next/router";
import { convertRankToImageName } from "@utils/image";

interface BoosterCardProps {
    boosters: Booster[];
}

export default function BoosterCard({boosters}: BoosterCardProps) {

    const router = useRouter()

    const toBoosterDetail = () => {
        void router.push(`/boosters/${boosters[0]._id}`)
    }

    return (
        <div className="gap-8 grid grid-cols-3 sm:grid-cols-3">
            {boosters.map((booster, index) => (
                <Card shadow="sm" key={index} isPressable onPress={toBoosterDetail}>
                    <CardBody className="overflow-hidden p-0 h-[350px]">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={booster.currentRank}
                            className="object-cover"
                            src={booster.avatarUrl}
                        />
                    </CardBody>
                    <CardFooter className="flex-col text-white bg-gradient-to-r from-[#202832] to-[#283347]">
                        <div className="flex w-[90%] justify-between">
                            <b className=" text-3xl">{booster.userId.name}</b>
                            <div className="flex items-center gap-3">
                                <Image
                                    width="100%"
                                    height="100%"
                                    className="h-[50px] w-[50px]"
                                    src={`/images/${convertRankToImageName(booster.currentRank)}.png`} alt={booster.currentRank}
                                />
                                <p className="text-lg font-bold">{capitalizeFirstLetter(booster.currentRank)}</p>
                            </div>
                        </div>
                        <div className="flex w-[90%] justify-between">
                            <b className="text-lg">Languages</b>
                            <p className="font-bold text-xl">{booster.languages}</p>
                        </div>
                        <div className="flex w-[90%] justify-between">
                            <b className="text-lg">Completed Boost</b>
                            <p className="font-bold text-xl">{booster.completedBoosts}</p>
                        </div>
                        <div className="flex w-[90%] justify-between">
                            <b className="text-lg">On Boostera</b>
                            <p className="font-bold text-xl">{calculateDaysDifferent(booster.createdAt)}</p>
                        </div>
                        <Button color="danger" className="w-full font-bold" onClick={toBoosterDetail}>
                            View Profile
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

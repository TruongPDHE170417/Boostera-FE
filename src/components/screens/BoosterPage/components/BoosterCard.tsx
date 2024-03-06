import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "@models/api";
import { Booster } from "@models/booster";
import { calculateDaysDifferent } from "@utils/dateCalculate";
import { capitalizeFirstLetter } from "@utils/format";

export default function BoosterCard() {
    const [boosters, setBoosters] = useState<Booster[]>([]);

    useEffect(() => {
        const handleGetBoosterList = async () => {
                const response = await fetch(`${API_ENDPOINT}/boosters/`);
                const data = await response.json() as Booster[];
                setBoosters(data);
        };
      
        handleGetBoosterList();

        const handleGetLastBoost = async () => {
            //TODO: Get last boost
        }
    }, []);

    return (
        <div className="gap-8 grid grid-cols-3 sm:grid-cols-3">
            {boosters.map((booster, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-hidden p-0 h-[350px]">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={booster.rank}
                            className="object-cover"
                            src={`/images/${booster?.rank}.png`}
                        />
                    </CardBody>
                    <CardFooter className="flex-col text-white bg-gradient-to-r from-[#202832] to-[#283347]">
                        <CardFooter className="justify-between">
                            <b className=" text-3xl">{booster.user.name}</b>
                            <div className="flex items-center gap-3">
                                <Image
                                    width="100%"
                                    height="100%"
                                    className="h-[50px] w-[50px]"
                                    src={`/images/${booster?.rank}.png`} alt={booster.rank}
                                />
                                <p className="text-lg font-bold">{capitalizeFirstLetter(booster.rank)}</p>
                            </div>
                        </CardFooter>
                        <CardFooter className="justify-between">
                            <b className="text-lg">Completed Boost</b>
                            <p className="font-bold text-xl">{booster.completedBoost}</p>
                        </CardFooter>
                        <CardFooter className="justify-between">
                            <b className="text-lg">On Boostera</b>
                            <p className="font-bold text-xl">{calculateDaysDifferent(booster.createdAt)}</p>
                        </CardFooter>
                        <Button color="danger" className="w-full font-bold">
                            View Profile
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

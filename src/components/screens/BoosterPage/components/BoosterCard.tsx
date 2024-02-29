import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const MOCK_BOOSTERS_LIST = [
    {
        name: "Apple",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 2",
        },
        languages: "EN",
        completed_boost: "90",
        active: "80",
        rating: "4.0"
    },
    {
        name: "Banana",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 3",
        },
        languages: "EN",
        completed_boost: "85",
        active: "75",
        rating: "4.2"
    },
    {
        name: "Cherry",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 4",
        },
        languages: "EN",
        completed_boost: "95",
        active: "85",
        rating: "4.7"
    },
    {
        name: "Date",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 5",
        },
        languages: "EN",
        completed_boost: "100",
        active: "90",
        rating: "4.8"
    },
    {
        name: "Elderberry",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 6",
        },
        languages: "EN",
        completed_boost: "80",
        active: "70",
        rating: "3.9"
    },
    {
        name: "Fig",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 7",
        },
        languages: "EN",
        completed_boost: "75",
        active: "65",
        rating: "3.8"
    },
    {
        name: "Grape",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 8",
        },
        languages: "EN",
        completed_boost: "70",
        active: "60",
        rating: "3.7"
    },
    {
        name: "Honeydew",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 9",
        },
        languages: "EN",
        completed_boost: "65",
        active: "55",
        rating: "3.6"
    },
    {
        name: "Iced Melon",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 10",
        },
        languages: "EN",
        completed_boost: "60",
        active: "50",
        rating: "3.5"
    },
    {
        name: "Jackfruit",
        img: "images/default-user-img.jpg",
        rank: {
            img: "/images/demo-rank.png",
            name: "Rank 11",
        },
        languages: "EN",
        completed_boost: "55",
        active: "45",
        rating: "3.4"
    }
];

export default function BoosterCard() {
    return (
        <div className="gap-8 grid grid-cols-3 sm:grid-cols-3">
            {MOCK_BOOSTERS_LIST.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-hidden p-0 h-[350px]">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.name}
                            className="object-cover"
                            src={item.img}
                        />
                    </CardBody>
                    <CardFooter className="flex-col text-white bg-gradient-to-r from-[#202832] to-[#283347]">
                        <CardFooter className="justify-between">
                            <b className=" text-3xl">{item.name}</b>
                            <Image
                                width="100%"
                                height="100%"
                                className="h-[50px] w-[50px]"
                                src={item.rank.img} alt={item.rank.img}
                            />
                            <p className="text-default-500  text-lg font-bold">{item.rank.name}</p>
                        </CardFooter>
                        <CardFooter className="justify-between">
                            <b className="text-lg">Completed Boost</b>
                            <p className="font-bold text-xl">{item.completed_boost}</p>
                        </CardFooter>
                        <CardFooter className="justify-between">
                            <b className="text-lg">Active</b>
                            <p className="font-bold text-xl">{item.active}</p>
                        </CardFooter>
                        <CardFooter className="justify-between">
                            <b className="text-lg">Rating</b>
                            <p className="font-bold text-xl">{item.rating}</p>
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

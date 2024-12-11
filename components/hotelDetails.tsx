"use client";
import { hotelType } from "@/types";
import {
  Heart,
  ParkingCircle,
  PersonStanding,
  Projector,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import CardRoom from "./cardRoom";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HotelDetails({ hotel }: { hotel: hotelType }) {
  const route = useRouter();
  const hotelFeatures = [
    {
      name: "WI-FI",
      icon: <Wifi className="w-4 h-4" />,
      key: "wifi",
    },
    {
      name: "Otopark",
      icon: <ParkingCircle className="w-4 h-4" />,
      key: "parking",
    },
    {
      name: "Havuz",
      icon: <Waves className="w-4 h-4" />,
      key: "pool",
    },
    {
      name: "Topalntı Odaları",
      icon: <Projector className="w-4 h-4" />,
      key: "projector",
    },
    {
      name: "Restoran",
      icon: <Utensils className="w-4 h-4" />,
      key: "restaurant",
    },
    {
      name: "Resepsiyon",
      icon: <PersonStanding className="w-4 h-4" />,
      key: "resepsiyon",
    },
  ];
  return (
    <div className="container my-4">
      <div className="flex justify-between bg-content_white p-4">
        <div>
          <h1>{hotel?.name || ""}</h1>
          <p>{hotel?.city}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Heart className="w-6 h-6" />
          <Button
            onClick={() => route.push("#rooms")}
            className="w-28 text-content_white"
          >
            Oda Seç
          </Button>
        </div>
      </div>
      <div className=" grid grid-cols-4 grid-rows-2 gap-4 my-4">
        {hotel?.images.map((image, index) => (
          <div
            key={image}
            className={index === 0 ? "col-span-2 row-span-2" : ""}
          >
            <Image
              loader={() => "/hotels/" + hotel.id + image}
              width={index === 0 ? 1000 : 500}
              height={index === 0 ? 1000 : 500}
              src={image}
              alt="image"
              className="w-auto h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-evenly gap-x-2 ">
        {hotelFeatures.map(
          (feature) =>
            hotel?.features.includes(feature.name) && (
              <div
                key={feature.key}
                className="flex items-center gap-2 p-4 bg-content_white"
              >
                {feature.icon}
                <p>{feature.name}</p>
              </div>
            )
        )}
      </div>
      <div id="rooms">
        {hotel?.rooms.map((room, index) => (
          <CardRoom
            hotelId={hotel.id.toString()}
            key={"room" + index}
            roomData={room}
          />
        ))}
      </div>
    </div>
  );
}

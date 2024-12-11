"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export type roomType = {
  name: string;
  adults: number;
  children: number;
};

export default function ItemsPicker({
  rooms,
  setRooms,
}: {
  rooms: roomType[];
  setRooms: React.Dispatch<React.SetStateAction<roomType[]>>;
}) {
  function resultAdultsAndChildren() {
    const result1 = rooms.map((room) => room.adults).reduce((a, b) => a + b, 0);
    const result2 = rooms
      .map((room) => room.children)
      .reduce((a, b) => a + b, 0);
    const result = result1 + result2;
    return result;
  }
  return (
    <Popover>
      <PopoverTrigger className="w-[180px] bg-content_white rounded-md">
        {resultAdultsAndChildren()} Misafir {rooms.length} Oda
      </PopoverTrigger>
      <PopoverContent className="bg-white p-0 flex flex-col items-end">
        {rooms.map((room, index) => (
          <>
            <div key={"room" + index + "1"} className="border-b w-full">
              <div className="bg-gray-200 p-2 flex items-center justify-between">
                <h3 className="  text-black">
                  {index + 1}. {room.name}
                </h3>
                <Button
                  onClick={() =>
                    setRooms([...rooms.filter((_, i) => i !== index)])
                  }
                  className={`bg-inherit underline text-red-500 hover:bg-inherit hover:text-red-500/70 w-fit h-4 ${
                    rooms.length === 1 ? "hidden" : ""
                  }`}
                >
                  Odayı Kaldır
                </Button>
              </div>
              <div className="flex justify-between m-2">
                <p>Yetişkin</p>
                <div className="flex gap-x-2 items-center">
                  <Button
                    onClick={() =>
                      setRooms([
                        ...rooms.slice(0, index),
                        { ...room, adults: room.adults - 1 },
                        ...rooms.slice(index + 1),
                      ])
                    }
                    disabled={room.adults === 1}
                    className="bg-inherit border-red-500 border w-5 h-8"
                  >
                    <MinusIcon />
                  </Button>
                  <span>{room.adults}</span>
                  <Button
                    onClick={() =>
                      setRooms([
                        ...rooms.slice(0, index),
                        { ...room, adults: room.adults + 1 },
                        ...rooms.slice(index + 1),
                      ])
                    }
                    disabled={room.adults === 9}
                    className="bg-inherit border-red-500 border w-5 h-8"
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between m-2">
                <p>Çocuk 0-17 Yaş</p>
                <div className="flex gap-x-2 items-center">
                  <Button
                    onClick={() =>
                      setRooms([
                        ...rooms.slice(0, index),
                        { ...room, children: room.children - 1 },
                        ...rooms.slice(index + 1),
                      ])
                    }
                    disabled={room.children === 0}
                    className="bg-inherit border-red-500 border w-5 h-8"
                  >
                    <MinusIcon />
                  </Button>
                  <span>{room.children}</span>
                  <Button
                    onClick={() =>
                      setRooms([
                        ...rooms.slice(0, index),
                        { ...room, children: room.children + 1 },
                        ...rooms.slice(index + 1),
                      ])
                    }
                    disabled={room.children === 4}
                    className="bg-inherit border-red-500 border w-5 h-8"
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ))}
        <Button
          onClick={() =>
            setRooms([...rooms, { name: "oda", adults: 1, children: 0 }])
          }
          className="bg-inherit underline text-green-900 hover:bg-inherit hover:text-green-900/70 w-fit"
        >
          Yeni Oda Ekle
        </Button>
      </PopoverContent>
    </Popover>
  );
}

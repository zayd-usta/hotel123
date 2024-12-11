"use client";
import Card from "@/components/card";
import { useSearch } from "@/components/hooks/useSearch";
import data from "@/data/hotel.json";
import { useEffect } from "react";
export default function Home() {
  const { searchData } = useSearch();
  useEffect(() => {
    console.log(searchData);
  }, [searchData]);
  return (
    <div className="text-3xl text-black container my-10">
      {data.data.map(
        (hotel) =>
          hotel.MaxAdults >= (searchData?.adults || 0) &&
          hotel.rooms.length >= (searchData?.rooms || 0) &&
          hotel.city.includes(searchData?.city || "") &&
          2 && <Card key={"hotel" + hotel.name} hotelData={hotel} />
      )}
    </div>
  );
}

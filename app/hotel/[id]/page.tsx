import HotelDetails from "@/components/hotelDetails";
import React from "react";
import data from "@/data/hotel.json";
export default function page({ params }: { params: { id: string } }) {
  return <HotelDetails hotel={data.data[Number(params.id) - 1]} />;
}

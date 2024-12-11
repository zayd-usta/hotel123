import { roomType } from "@/types";
import { BedDouble, Check, InfoIcon, Move3D } from "lucide-react";
import React from "react";
import "swiper/css";
import { Button } from "./ui/button";
import ImageGallery from "./imageGalery";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useSearch } from "./hooks/useSearch";
export default function CardRoom({
  roomData,
  hotelId,
}: {
  roomData: roomType;
  hotelId: string;
}) {
  const { searchData } = useSearch();
  function days() {
    const fromDate = searchData?.DateRange?.from; // تاريخ البداية
    const toDate = searchData?.DateRange?.to; // تاريخ النهاية

    console.log(toDate);
    if (fromDate && toDate) {
      // تحويل النصوص إلى كائنات moment
      const start = moment(fromDate);
      const end = moment(toDate);

      // حساب الفرق بالأيام
      const diffInDays = end.diff(start, "days");
      return diffInDays;
    }
  }
  const route = useRouter();
  return (
    <div className="flex gap-x-4 bg-content_white w-full my-4 rounded-xl p-4">
      <ImageGallery images={roomData.images} />
      <div className="w-1/2">
        <p className="flex gap-2 items-center">
          <BedDouble className="w-4 h-4 text-green-600" />
          {roomData.Bed} Yatak
        </p>
        <p className="flex gap-2 items-center">
          <Move3D className="w-4 h-4 text-green-600" />
          {roomData.space} m2
        </p>
        {roomData.features.map((feature, index) => (
          <div key={"feature-" + index} className="flex gap-2 items-center">
            <Check className="min-w-4 min-h-4 max-w-4 max-h-4 text-green-600" />
            <p>{feature}</p>
          </div>
        ))}
        <p className="flex gap-2 items-center">
          <InfoIcon className="w-4 h-4 text-black" />
          İade Yapılmaz
        </p>
      </div>
      <div className="bg-gray-400 w-full text-content_white p-4 ">
        <div className="flex justify-between items-center p-2 text-white border-b border-black h-2/3">
          <p className="flex gap-2 items-center">
            <input type="radio" checked readOnly />
            Sadece Oda
            <BedDouble className="w-4 h-4 text-white" />
          </p>
          {roomData.discount
            ? (roomData.price - (roomData.price * roomData.discount) / 100) *
              (days() || 1)
            : roomData.price * (days() || 1)}{" "}
          TL
        </div>
        <div className="flex justify-between items-center p-2">
          {roomData.discount ? (
            <div>
              <p className="line-through text-end">
                {roomData.price * (days() || 1)} TL
              </p>
              <p>
                {days()} gece{" "}
                <span className="font-bold">
                  {(roomData.price -
                    (roomData.price * roomData.discount) / 100) *
                    (days() || 1)}{" "}
                  TL
                </span>
              </p>
            </div>
          ) : (
            <p>
              {days()} gece{" "}
              <span className="font-bold">
                {roomData.price * (days() || 1)}
              </span>{" "}
              TL
            </p>
          )}
          <Button
            onClick={() => route.push(`/payment/${hotelId}/${roomData.id}`)}
            className="bg-green-600 hover:bg-green-700"
          >
            Odayı Seç
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";
import {
  ParkingCircle,
  PersonStanding,
  Projector,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import ImageView from "./imageView";
import Rating from "./rating";
import { Button } from "./ui/button";
import { hotelType } from "@/types";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useSearch } from "./hooks/useSearch";

export default function Card({ hotelData }: { hotelData: hotelType }) {
  const route = useRouter();
  const { searchData } = useSearch();
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
  return (
    <div className="flex gap-4 p-2 border border-primary rounded-lg m-2">
      <ImageView id={hotelData.id.toString()} images={hotelData.images} />
      <div className="flex flex-row justify-between w-full">
        <div className="text-lg">
          <h1 className="font-bold">{hotelData.name}</h1>
          <Rating className="my-2" rating={hotelData.evaluation} />
          <p>{hotelData.city}</p>
          <div className="grid grid-cols-2 text-sm mt-4">
            {hotelFeatures.map(
              (feature) =>
                hotelData.features.includes(feature.name) && (
                  <>
                    <span
                      key={"feature" + feature.key}
                      className="flex gap-2 items-center"
                    >
                      {feature.icon} {feature.name}
                    </span>
                  </>
                )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-6 items-end ">
          <Evaluation
            review={hotelData.reviews}
            rating={hotelData.evaluation}
          />

          <div className="text-lg w-full flex flex-col items-end gap-y-2">
            {hotelData.discount ? (
              <>
                <p className="text-end w-fit bg-red-700 p-1 rounded-lg text-content_white text-sm">
                  %{hotelData.discount} indirim
                </p>
                <p>
                  {days()} Gece{" "}
                  <span className="line-through text-slate-400">
                    {hotelData.price * (days() || 1)} TL
                  </span>{" "}
                  <span className="text-red-500">
                    {(hotelData.price -
                      (hotelData.price * hotelData.discount) / 100) *
                      (days() || 1)}{" "}
                    TL
                  </span>
                </p>
              </>
            ) : (
              <p>
                {days()} Gece{" "}
                <span className="text-red-500">
                  {hotelData.price * (days() || 1)} TL
                </span>
              </p>
            )}
            <Button
              onClick={() => route.push(`/hotel/${hotelData.id}`)}
              className="w-28 bg-green-600 text-content_white"
            >
              Oada Seç
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Evaluation({
  review,
  rating,
}: {
  review: number;
  rating: number;
}) {
  function result(res: number) {
    let result1 = {
      title: "Muhteşem",
      className: "bg-green-800",
    };
    if (res >= 4) {
      result1 = {
        title: "Muhteşem",
        className: "bg-green-600",
      };
    } else if (res >= 3) {
      result1 = {
        title: "Iyi",
        className: "bg-green-400",
      };
    } else if (res >= 2.5) {
      result1 = {
        title: "Orta",
        className: "bg-yellow-400",
      };
    } else if (res >= 2) {
      result1 = {
        title: "Kötü",
        className: "bg-red-400",
      };
    }
    return (
      <p className="text-lg flex items-center justify-end gap-2">
        {result1.title}
        <span className={`p-1 rounded-full text-sm ${result1.className}`}>
          {res}
        </span>
      </p>
    );
  }
  return (
    <div className="border-b border-b-black/10 pb-1">
      {result(rating)}
      <p className="text-sm text-end">({review} Yorum)</p>
    </div>
  );
}

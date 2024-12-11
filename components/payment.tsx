"use client";
import React from "react";
import Rating from "@/components/rating";
import { useSearch } from "@/components/hooks/useSearch";
import Moment from "react-moment";
import {
  BedDouble,
  Clock,
  Moon,
  ShieldCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { hotelType, roomType } from "@/types";
import moment from "moment";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Payment({
  roomData,
  hotelDta,
}: {
  roomData: roomType;
  hotelDta: hotelType;
}) {
  const { searchData } = useSearch();
  const iconClassName = "flex items-center gap-x-2";
  const route = useRouter();
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
  function handlePayment(form: any) {
    form.preventDefault();
    route.push("/");
  }

  return (
    <div className="flex container my-4">
      <div className=" w-2/3">
        <div className="bg-white">
          <h4 className="p-4 border-b border-gray-400 w-full">
            KONAKLAMA BİLGİLERİ
          </h4>
          <div className="flex justify-between border-b border-gray-200">
            <div className="p-4">
              <h4>{hotelDta.name}</h4>
              <Rating
                className="flex items-center mt-2"
                showLabel
                rating={hotelDta.evaluation}
              />
            </div>
            <div className="flex gap-x-4 items-start p-4 text-sm">
              <p>
                <Moment format="DD MMMM YYYY ">
                  {searchData?.DateRange?.from}
                </Moment>
                <br />
                <Moment format="dddd, hh:mm">
                  {searchData?.DateRange?.from}
                </Moment>
              </p>
              <p className="flex items-center gap-x-2">
                <Clock className="w-4 h-4" />
                {days()} gece
              </p>
              <p>
                <Moment format="DD MMMM YYYY ">
                  {searchData?.DateRange?.to}
                </Moment>
                <br />
                <Moment format="dddd, hh:mm">
                  {searchData?.DateRange?.to}
                </Moment>
              </p>
            </div>
          </div>
          <div className="flex gap-x-4 p-4">
            <Image
              className="w-56"
              loader={() => `/hotels/${hotelDta.id}${hotelDta.images[0]}`}
              src={hotelDta.images[0]}
              width={1000}
              height={1000}
              alt="hotel"
            />
            <div>
              <p className={iconClassName}>
                <Users className="w-4 h-4" /> {roomData.adults} Yetişkin
              </p>
              <p className={iconClassName}>
                <Moon className="w-4 h-4" /> {days()} gece
              </p>
              <p className={iconClassName}>
                <BedDouble className="w-4 h-4" /> {roomData.Bed} Yatak
              </p>
              <p className={iconClassName}>
                <UtensilsCrossed className="w-4 h-4" /> Sadece Oda
              </p>
            </div>
          </div>
          <p className="px-4 pb-4">{hotelDta.city}</p>
        </div>
        <div className="bg-white mt-4">
          <h3 className="p-4 border-b border-gray-400 w-full text-lg">
            FİYAT BİLGİLERİ
          </h3>
          <div className="flex justify-between p-4 text-gray-500">
            <p>Toplam Tutar</p>
            {roomData.discount ? (
              <p>
                {(roomData.price - (roomData.price * roomData.discount) / 100) *
                  (days() || 1)}{" "}
                TL
              </p>
            ) : (
              <p>{roomData.price * (days() || 1)} TL</p>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handlePayment} className="bg-content_white w-1/3 mx-4">
        <h3 className="p-4 border-b border-gray-400 w-full">ÖDEME BİLGİLERİ</h3>
        <div className="m-4 pb-4 border-b border-gray-500">
          <h3 className=" mx-auto w-fit border-b-2 border-red-500 text-red-500 text-xl font-bold mb-4">
            Banka/Kredi Kartı
          </h3>
          <Image src="/payment.png" alt="payment" width={1000} height={1000} />
        </div>
        <div className="m-4">
          <span>Kart Numarası</span>
          <Input
            type="number"
            required
            placeholder="**** **** **** ****"
            className="mt-2 border-black"
          />
        </div>
        <div className="m-4 gap-4 flex justify-between border-b border-gray-500 pb-8">
          <div>
            <span>Son Kullanma Tarihi</span>
            <Input
              type="number"
              required
              placeholder="AA / YY"
              className="mt-2 border-black"
            />
          </div>
          <div>
            <span>CVV</span>
            <Input
              type="number"
              required
              placeholder="***"
              className="mt-2 border-black"
            />
          </div>
        </div>
        <div className="w-fit mx-auto">
          <Button
            type="submit"
            className="w-48 h-auto text-3xl text-content_white bg-green-600 hover:bg-green-700"
          >
            <ShieldCheck className="min-w-8 min-h-8 text-content_white" />
            {roomData.discount ? (
              <p>
                {(roomData.price - (roomData.price * roomData.discount) / 100) *
                  (days() || 1)}{" "}
              </p>
            ) : (
              <p>{roomData.price * (days() || 1)}</p>
            )}
            TL
          </Button>
        </div>
      </form>
    </div>
  );
}

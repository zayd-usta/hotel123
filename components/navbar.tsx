"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DatePicker } from "./datePicker";
import ItemsPicker, { roomType } from "./itemsPicker";
import { Button } from "./ui/button";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useSearch } from "./hooks/useSearch";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { setSearchData } = useSearch();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [city, setCity] = useState("usak");
  const [roomData, setRoomData] = useState({
    adults: 0,
    rooms: 0,
  });
  const route = useRouter();
  const [rooms, setRooms] = useState<roomType[]>([
    {
      name: "Oda",
      adults: 1,
      children: 0,
    },
  ]);
  const citys = [
    { value: "adana", label: "Adana" },
    { value: "adiyaman", label: "Adıyaman" },
    { value: "afyonkarahisar", label: "Afyonkarahisar" },
    { value: "agri", label: "Ağrı" },
    { value: "amasya", label: "Amasya" },
    { value: "ankara", label: "Ankara" },
    { value: "antalya", label: "Antalya" },
    { value: "artvin", label: "Artvin" },
    { value: "aydin", label: "Aydın" },
    { value: "balikesir", label: "Balıkesir" },
    { value: "bilecik", label: "Bilecik" },
    { value: "bingol", label: "Bingöl" },
    { value: "bitlis", label: "Bitlis" },
    { value: "bolu", label: "Bolu" },
    { value: "burdur", label: "Burdur" },
    { value: "bursa", label: "Bursa" },
    { value: "canakkale", label: "Çanakkale" },
    { value: "cankiri", label: "Çankırı" },
    { value: "corum", label: "Çorum" },
    { value: "denizli", label: "Denizli" },
    { value: "diyarbakir", label: "Diyarbakır" },
    { value: "edirne", label: "Edirne" },
    { value: "elazig", label: "Elazığ" },
    { value: "erzincan", label: "Erzincan" },
    { value: "erzurum", label: "Erzurum" },
    { value: "eskisehir", label: "Eskişehir" },
    { value: "gaziantep", label: "Gaziantep" },
    { value: "giresun", label: "Giresun" },
    { value: "gumushane", label: "Gümüşhane" },
    { value: "hakkari", label: "Hakkâri" },
    { value: "hatay", label: "Hatay" },
    { value: "igdir", label: "Iğdır" },
    { value: "isparta", label: "Isparta" },
    { value: "istanbul", label: "İstanbul" },
    { value: "izmir", label: "İzmir" },
    { value: "kahramanmaras", label: "Kahramanmaraş" },
    { value: "karabuk", label: "Karabük" },
    { value: "karaman", label: "Karaman" },
    { value: "kars", label: "Kars" },
    { value: "kastamonu", label: "Kastamonu" },
    { value: "kayseri", label: "Kayseri" },
    { value: "kirikkale", label: "Kırıkkale" },
    { value: "kirklareli", label: "Kırklareli" },
    { value: "kirsehir", label: "Kırşehir" },
    { value: "kilis", label: "Kilis" },
    { value: "kocaeli", label: "Kocaeli" },
    { value: "konya", label: "Konya" },
    { value: "kutahya", label: "Kütahya" },
    { value: "malatya", label: "Malatya" },
    { value: "manisa", label: "Manisa" },
    { value: "mardin", label: "Mardin" },
    { value: "mersin", label: "Mersin" },
    { value: "mugla", label: "Muğla" },
    { value: "mus", label: "Muş" },
    { value: "nevsehir", label: "Nevşehir" },
    { value: "nigde", label: "Niğde" },
    { value: "ordu", label: "Ordu" },
    { value: "osmaniye", label: "Osmaniye" },
    { value: "rize", label: "Rize" },
    { value: "sakarya", label: "Sakarya" },
    { value: "samsun", label: "Samsun" },
    { value: "siirt", label: "Siirt" },
    { value: "sinop", label: "Sinop" },
    { value: "sivas", label: "Sivas" },
    { value: "sanliurfa", label: "Şanlıurfa" },
    { value: "sirnak", label: "Şırnak" },
    { value: "tekirdag", label: "Tekirdağ" },
    { value: "tokat", label: "Tokat" },
    { value: "trabzon", label: "Trabzon" },
    { value: "tunceli", label: "Tunceli" },
    { value: "usak", label: "Uşak" },
    { value: "van", label: "Van" },
    { value: "yalova", label: "Yalova" },
    { value: "yozgat", label: "Yozgat" },
    { value: "zonguldak", label: "Zonguldak" },
  ];

  useEffect(() => {
    const result1 = rooms.map((room) => room.adults).reduce((a, b) => a + b, 0);
    const result2 = rooms
      .map((room) => room.children)
      .reduce((a, b) => a + b, 0);
    const result = result1 + result2;
    setRoomData({
      adults: result,
      rooms: rooms.length,
    });
  }, [rooms]);
  return (
    <div className="bg-defaultBG">
      <div className="container p-4 flex gap-4">
        <Select
          value={city}
          onValueChange={(value) => setCity(value)}
          defaultValue={citys[70].value}
        >
          <SelectTrigger className="w-[180px] bg-content_white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-content_white ">
            {citys.map((city, index) => (
              <SelectItem
                key={"city-" + index}
                className={"text-content"}
                value={city.value}
              >
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate} />
        <ItemsPicker rooms={rooms} setRooms={setRooms} />
        <Button
          onClick={() => (
            setSearchData({
              adults: roomData.adults,
              rooms: roomData.rooms,
              city: citys.find((city1) => city1.value === city)?.label || "",
              DateRange: date,
            }),
            route.push("/")
          )}
          className="text-content_white w-32"
        >
          Ara
        </Button>
      </div>
    </div>
  );
}

import { DateRange } from "react-day-picker";

export type hotelType = {
  id: number;
  name: string;
  city: string;
  images: string[];
  features: string[];
  price: number;
  discount?: number;
  evaluation: number;
  reviews: number;
  MaxAdults: number;
  rooms: roomType[];
};
export type roomType = {
  id: number;
  Bed: number;
  space: number;
  features: string[];
  price: number;
  adults: number;
  discount?: number;
  images: string[];
};
export type SearchType = {
  city: string;
  rooms: number;
  adults: number;
  DateRange: DateRange | undefined;
};

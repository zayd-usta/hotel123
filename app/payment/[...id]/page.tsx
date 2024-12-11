import Payment from "@/components/payment";
import data from "@/data/hotel.json";

export default function page({ params }: { params: { id: string[] } }) {
  const hotelDta = data.data[Number(params.id[0]) - 1];
  const roomData = hotelDta.rooms[Number(params.id[1]) - 1];

  return <Payment roomData={roomData} hotelDta={hotelDta} />;
}

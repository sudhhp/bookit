// import rooms from "@/data/rooms.json";
import RoomCard from "@/components/RoomCard";
import Heading from "@/components/Heading";
import getAllRooms from "@/actions/getAllRooms";
export default async function Home() {
  const rooms = await getAllRooms();
  return (
    <>
      <Heading title="Available Room" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room} />)
      ) : (
        <h3>لیستی برای رزرو یافت نشد</h3>
      )}
    </>
  );
}

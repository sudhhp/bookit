import Heading from "@/components/Heading";
import getMyBookings from "@/actions/getMyBookings";
import BookedRoomCard from "@/components/BookedRoomCard";
const bookingPage = async () => {
  const bookings = await getMyBookings();
  console.log(bookings);
  return (
    <>
      <Heading title={"My Bookings"} />
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4 ">You Have No Bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  );
};

export default bookingPage;

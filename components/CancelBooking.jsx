"use client";
import { toast } from "react-toastify";
import cancelBooking from "@/actions/cancelBooking";
const CancelBookingButton = ({ bookingId }) => {
  const handleCancelClick = async () => {
    if (!confirm("Are you sure you want to cancel this booking?!")) {
      return;
    }
    try {
      const result = await cancelBooking(bookingId);
      if (result.success) {
        toast.success("Booking Cancelled successfully!");
      }
    } catch (error) {
      console.log("Failed to cencel booking", error);
      return {
        error: "Failed to cancel booking",
      };
    }
  };
  return (
    <>
      <button
        onClick={handleCancelClick}
        className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
      >
        Cancel Booking
      </button>
    </>
  );
};

export default CancelBookingButton;

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import bookRoom from "@/actions/bookRoom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
const BookingForm = ({ room }) => {
  const [state, formAction] = useActionState(bookRoom, {});
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Room has been booked!");
      router.push("/bookings");
    }
  }, [state]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Book this Room</h2>
      <form action={formAction} className="mt-4">
        <input type="hidden" name="room_id" value={room.$id} />
        <input
          type="hidden"
          name="check_in_date"
          value={
            checkInDate ? new Date(checkInDate).toISOString().split("T")[0] : ""
          }
        />
        <input
          type="hidden"
          name="check_out_date"
          value={
            checkOutDate
              ? new Date(checkOutDate).toISOString().split("T")[0]
              : ""
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-In Date
            </label>
            <DatePicker
              value={checkInDate}
              onChange={setCheckInDate}
              calendar={persian}
              locale={persian_en}
              inputClass="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              format="YYYY/MM/DD"
            />
          </div>

          <div>
            <label
              htmlFor="check_in_time"
              className="block text-sm font-medium text-gray-700"
            >
              Check-In Time
            </label>
            <input
              type="time"
              id="check_in_time"
              name="check_in_time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-Out Date
            </label>
            <DatePicker
              value={checkOutDate}
              onChange={setCheckOutDate}
              calendar={persian}
              locale={persian_en}
              inputClass="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              format="YYYY/MM/DD"
            />
          </div>

          <div>
            <label
              htmlFor="check_out_time"
              className="block text-sm font-medium text-gray-700"
            >
              Check-Out Time
            </label>
            <input
              type="time"
              id="check_out_time"
              name="check_out_time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            Book Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

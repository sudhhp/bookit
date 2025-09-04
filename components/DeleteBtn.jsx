"use client";
import { toast } from "react-toastify";
import deleteRoom from "@/actions/deleteRoom";
import { FaTrash } from "react-icons/fa";

const DeleteBtn = ({ roomId }) => {
  const handleDel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    try {
      await deleteRoom(roomId);
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Failed to delete room", error);
      toast.error("Failed to delete room");
    }
  };

  return (
    <button
      onClick={handleDel}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700 flex items-center justify-center"
    >
      <FaTrash className="mr-1" /> Delete
    </button>
  );
};

export default DeleteBtn;

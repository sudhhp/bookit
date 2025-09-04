"use server";

// import { createAdminClient } from "@/config/appwrite";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import checkAuth from "./checkAuth";
// import { Query } from "node-appwrite";
async function cancelBooking(bookingId) {
  // const sessionCookie = cookies().get("apsession");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("apsession");

  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    //get users ID
    // const user = await account.get();
    // const userId = user.$id;
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in To cancel a booking ",
      };
    }
    //  get the booking
    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );
    //check if booking belong to current user
    if (booking.user_id !== user.id) {
      return {
        error: "You are not authorized to cancel this booking",
      };
    }
    //Delete booking
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );
    revalidatePath("/bookings", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to cancel booking", error);
    return {
      error: "Failed to cancel booking",
    };
  }
}

export async function revalidateRooms() {
  try {
    await revalidatePath("/", "layout");
  } catch (error) {
    console.log("Failed to revalidate path", error);
  }
}

export default cancelBooking;

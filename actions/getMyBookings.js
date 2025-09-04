"use server";

// import { createAdminClient } from "@/config/appwrite";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";
async function getMyBookings() {
  // const sessionCookie = cookies().get("apsession");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("apsession");

  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    //get users ID
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You Are Not logged In!",
      };
    }
    // const user = await account.get();
    // const userId = user.$id;
    // Fetch users Bookings
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal("user_id", user.id)]
    );

    return bookings;
  } catch (error) {
    console.log("Failed to get users bookings", error);
    return {
      error: "Failed To get Bookings  ",
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

export default getMyBookings;

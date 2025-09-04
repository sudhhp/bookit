"use server";

// import { createAdminClient } from "@/config/appwrite";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
async function getMyRooms() {
  // const sessionCookie = cookies().get("apsession");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("apsession");

  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases, account } = await createSessionClient(
      sessionCookie.value
    );
    //get users ID
    const user = await account.get();
    const userId = user.$id;
    // Fetch users rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    return rooms;
  } catch (error) {
    console.log("Failed to get users rooms", error);
    redirect("/error");
  }
}

export async function revalidateRooms() {
  try {
    await revalidatePath("/", "layout");
  } catch (error) {
    console.log("Failed to revalidate path", error);
  }
}

export default getMyRooms;

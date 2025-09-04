"use server";
// import { createAdminClient } from "@/config/appwrite";
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
async function deleteRoom(roomId) {
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
    // find room to delete
    const findToDel = rooms.find((room) => room.$id === roomId);
    // Delet the room
    if (findToDel) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        findToDel.$id
      );
      //revalidation
      revalidatePath("/rooms/my", "layout");
      revalidatePath("/", "layout");
      return {
        success: true,
      };
    } else {
      return {
        error: "Room Not Found",
      };
    }

    // return rooms;
  } catch (error) {
    console.log("Failed to delete users room", error);
    return {
      error: "Failed to delete room",
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

export default deleteRoom;

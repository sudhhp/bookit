"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destroySession() {
  const cookieStore = await cookies();
  // Retrieve the session cookie
  const sessionCookie = cookieStore.get("apsession");

  if (!sessionCookie) {
    return {
      error: "No session cookie found",
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    // Delete current session
    await account.deleteSession("current");

    // Clear session cookie
    cookieStore.delete("apsession");

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error deleting session",
    };
  }
}

export default destroySession;

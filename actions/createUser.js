"use server";
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";
async function createUser(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmpassword = formData.get("confirm-password");
  if (!email || !name || !password) {
    return {
      error: "Please Fill In All Fields",
    };
  }
  if (password.length < 8) {
    return {
      error: "Password Must Be Atleast 8 Char",
    };
  }
  if (password !== confirmpassword) {
    return {
      error: "Passwords Do Not Match",
    };
  }
  //   get account instance
  const { account } = await createAdminClient();
  try {
    // create user
    await account.create(ID.unique(), email, password, name);
    return {
      success: true,
    };
  } catch (error) {
    console.log("reqisteration error", error);
    return {
      error: "Could Not Register User",
    };
  }
}
export default createUser;

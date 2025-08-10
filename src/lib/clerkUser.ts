import { clerkClient } from "@clerk/nextjs/server";

// NOTE: Fetch full user info from clerk by UserId

export async function getUserInfo(userId: string){
  try {
    const user = await clerkClient.user.getUser(userId);
    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      isAdmin: false,
    };
  } catch (error){
    throw new Error("Failed to fetch user from clerk")
  }
}

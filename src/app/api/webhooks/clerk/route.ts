import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();
  const body = JSON.parse(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      await db.insert(users).values({
        id: id,
        email: email_addresses[0]?.email_address || "",
        firstName: first_name || "",
        lastName: last_name || "",
        isAdmin: false,
      });

      console.log(`User ${id} created in database`);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      await db
        .update(users)
        .set({
          email: email_addresses[0]?.email_address || "",
          firstName: first_name || "",
          lastName: last_name || "",
        })
        .where(eq(users.id, id));

      console.log(`User ${id} updated in database`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      await db.delete(users).where(eq(users.id, id || ""));
      console.log(`User ${id} deleted from database`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return new Response("", { status: 200 });
}

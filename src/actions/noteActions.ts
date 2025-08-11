"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { notes, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


async function syncUser(userId: string){

  try {
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if(existingUser.length === 0){
      await db.insert(users).values({
        id: userId,
        email: "", // Will be updated by webhook when available
        isAdmin: false
      })
    }
  } catch(error){
      console.error("Error Syncing with User");
      console.error(error instanceof Error ? error.message : String(error));
  }
}


export const getNotes = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const data = await db.select().from(notes).where(eq(notes.ownerId, userId));
    return data;
};

export const createNote = async (formData: FormData) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    await syncUser(userId);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
        throw new Error("Title and content are required");
    }

    await db.insert(notes).values({
        title,
        content,
        ownerId: userId,
    });

    revalidatePath("/notes");
    redirect("/notes");
};

export const deleteNote = async (id: number) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Verify ownership
    const note = await db.select().from(notes).where(eq(notes.id, id)).limit(1);
    if (!note[0] || note[0].ownerId !== userId) {
        throw new Error("Note not found or unauthorized");
    }

    await db.delete(notes).where(eq(notes.id, id));
    revalidatePath("/notes");
};

export const updateNote = async (id: number, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
        throw new Error("Title and content are required");
    }

    // Verify ownership
    const note = await db.select().from(notes).where(eq(notes.id, id)).limit(1);
    if (!note[0] || note[0].ownerId !== userId) {
        throw new Error("Note not found or unauthorized");
    }

    await db
        .update(notes)
        .set({
            title,
            content,
        })
        .where(eq(notes.id, id));

    revalidatePath("/notes");
    redirect("/notes");
};

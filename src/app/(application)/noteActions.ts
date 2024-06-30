"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NoteSchema } from "@/validators/note-schema";
import { $Enums } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const newNoteAction = async (notebookId: string) => {
  try {
    const session = await auth();
    if (!session) return { error: "Not Authenticated" };
    const data = await db.note.create({
      data: {
        title: "Untitled",
        notebookId: notebookId,
        placeholder: "Start writing here",
        userID: session.user.id as string,
      },
    });
    revalidatePath(`/notebook/${notebookId}`);
    return { success: "Note Created, Redirecting in 3 seconds", data: data.id };
  } catch (error) {
    return { error: "Failed to create note" };
  }
};
export const saveNoteAction = async (noteStr: string) => {
  try {
    const unSafe = JSON.parse(noteStr);
    const data = NoteSchema.parse(unSafe);
    const session = await auth();
    if (data.visibility !== "editable" && !session)
      return { error: "Not Authenticated" };
    const resp = await db.note
      .update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          content: data.content,
          html: data.Html,
          placeholder: data.placeholder,
        },
      })
      .catch((e) => {
        return { error: "Something went wrong" };
      });
    revalidatePath(`/notebook/${data.notebookId}`);
    return { success: "Note Saved" };
  } catch (e) {
    return { error: "Invalid Data" };
  }
};

export const toggleVisibilityAction = async (
  currentState: $Enums.visibility,
  id: string
) => {
  const session = await auth();
  if (!session) return { error: "Not Authenticated" };
  try {
    const resp = await db.note.update({
      where: {
        id,
      },
      data: {
        visibility: currentState === "readOnly" ? "restricted" : "readOnly",
      },
    });
    return { success: "This note can now be viewed by others" };
  } catch (e) {
    return { error: "Invalid Data" };
  }
};
export const toggleSharingAction = async (
  currentState: $Enums.visibility,
  id: string
) => {
  const session = await auth();
  if (!session) return { error: "Not Authenticated" };
  try {
    const resp = await db.note.update({
      where: {
        id,
      },
      data: {
        visibility: currentState === "editable" ? "readOnly" : "editable",
      },
    });
    return { success: "This note can now be edited by others" };
  } catch (e) {
    return { error: "Invalid Data" };
  }
};
export const deleteNoteAction = async (id: string) => {
  const session = await auth();
  if (!session) return { error: "Not Authenticated" };
  try {
    const resp = await db.note.delete({
      where: {
        id,
      },
    });
    return { success: "Note Deleted" };
  } catch (e) {
    return { error: "Invalid Data" };
  }
};

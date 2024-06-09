"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewNote = async (notebookId: unknown) => {
  if (!notebookId || typeof notebookId !== "string")
    throw new Error("Notebook ID is required");
  const supabase = createServerClient();
  const { data: session, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!session.user) throw new Error("Unauthorized");
  const { data, error: noteError } = await supabase
    .from("notes")
    .insert({
      notebookid: notebookId,
      title: "Untitled",
      userid: session.user.id,
    })
    .select(`id`)
    .single();
  if (noteError) throw noteError;
  revalidatePath(`/editor/${data.id}`);
  if (data) {
    redirect(`/editor/${data.id}`);
  } else {
    throw new Error("Something went wrong. Please try again later.");
  }
};


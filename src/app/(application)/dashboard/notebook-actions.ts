"use server";

import { createServerClient } from "@/lib/supabase/server";
import { newNotebookSchema } from "@/validators/new-notebook-schema";
import { revalidatePath } from "next/cache";

export const createNewNotebook = async (unsafeData: unknown) => {
  const { success, data } = newNotebookSchema.safeParse(unsafeData);
  if (!success) {
    throw new Error("Invalid data");
  }
  const supabase = createServerClient();
  const { data: session, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!session.user) throw new Error("Unauthorized");
  console.log(session.user.id);
  const { data: notebook, error } = await supabase
    .from("notebook")
    .insert({ ...data, userid: session.user.id });
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard");
  return notebook;
};

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidate = async (notebookID: string) => {
  revalidatePath(`/notebook/${notebookID}`);
};

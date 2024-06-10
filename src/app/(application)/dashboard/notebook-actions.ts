"use server";

import { revalidatePath } from "next/cache";

export const revalidateNotebook = async () => {
  revalidatePath(`/dashboard`);
};

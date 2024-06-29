"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createNotebookAction = async (title: string) => {
  try {
    const session = await auth();
    if (!session) return { error: "Not Authenticated" };
    const resp = await db.notebook.create({
      data: {
        name: title,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath(`/dashboard`);
    return { success: "Notebook Created" };
  } catch (error) {
    return { error: "Error Creating Notebook" };
  }
};
export const editNotebookAction = async (name: string, id: string) => {
  const session = await auth();
  if (!session) return { error: "Not Authenticated" };
  try {
    const resp = await db.notebook.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return { success: "Notebook Updated" };
  } catch (e) {
    return { error: "Invalid Data" };
  }
};
export const deleteNotebookAction = async (id: string) => {
  const session = await auth();
  if (!session) return { error: "Not Authenticated" };
  try {
    const resp = await db.notebook.delete({
      where: {
        id,
      },
    });
    return { success: "Note Deleted" };
  } catch (e) {
    return { error: "Error Deleting Notebook" };
  }
  // setIsLoading(true);
  // const { error } = await supabase
  //   .from("notebook")
  //   .delete()
  //   .eq("id", notebook.id);
  // setIsLoading(false);
  // if (!error) {
  //   setDeleteDialogOpen(false);
  //   router.refresh();
  // } else console.log(error);
};

import { db } from "@/lib/db";
import { Editor } from "./Editor";

import { auth } from "@/auth";
import { notFound } from "next/navigation";
// import TextArea from "react-textarea-autosize";
export default async function EditorPage({
  params,
}: {
  params: { noteid: string };
}) {
  const session = await auth();
  const note = await db.note
    .findUnique({
      where: {
        id: params.noteid,
      },
      select: {
        id: true,
        title: true,
        content: true,
        notebookId: true,
        visibility: true,
        userID: true,
      },
    })
    .catch(() => {
      notFound();
    });
  if (!note) notFound();
  if (note?.visibility !== "editable" && note?.userID !== session?.user?.id)
    notFound();
  return <>{<Editor note={note} />}</>;
}

import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Backbutton } from "./backbutton";

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await db.note
    .findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        title: true,
        userID: true,
        visibility: true,
        html: true,
      },
    })
    .catch(() => {
      notFound();
    });
    const session = await auth();
  if (!note) notFound();
  if(note.visibility === "restricted" && note.userID !== session?.user.id) notFound();
  return (
    <>
      <main className="  px-4 sm:px-10 md:px-16 py-8 ">
        <div className="flex items-center justify-between">
          <Backbutton />
          {(session?.user.id === note.userID ||
            note.visibility === "editable") && (
            <Link href={`/editor/${note.id}`} className={cn(buttonVariants())}>
              <Pencil className="w-4 h-4 cursor-pointer mr-2" />
              Edit
            </Link>
          )}
        </div>
        <section className="prose px-4 md:px-8 mt-8 max-w-4xl mx-auto break-all">
          <h1>{note.title}</h1>
          <section dangerouslySetInnerHTML={{ __html: note.html || "" }} />
        </section>
      </main>
    </>
  );
}

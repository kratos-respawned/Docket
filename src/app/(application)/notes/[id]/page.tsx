import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })
    .catch(() => {
      notFound();
    });
  const session = await auth();
  if (!note) notFound();
  if (note.visibility === "restricted" && note.userID !== session?.user.id)
    notFound();
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
        <section className="  px-4 md:px-8 mt-8 max-w-4xl mx-auto break-words">
          <div className="prose ">
          <h1 >{note.title}</h1>
          </div>
          <div className=" my-4 mb-8 flex space-x-4">
            {
              <div
                key={note.user.id}
                className="flex items-center space-x-2 text-sm"
              >
                <Image
                  src={note.user.image || "https://avatars.dicebear.com/api/avataaars/johndoe.svg"}
                  alt={note.user.name || "anonymous"}
                  width={42}
                  height={42}
                  className="rounded-full bg-white"
                />
                <div className="flex-1 text-left leading-tight">
                  <p className="font-medium">{note.user.name}</p>
                  {note.user.email && (
                    <p className="text-[12px] text-muted-foreground">
                      {note.user.email}
                    </p>
                  )}
                </div>
              </div>
            }
          </div>
          <section className="prose" dangerouslySetInnerHTML={{ __html: note.html || "" }} />
        </section>
      </main>
    </>
  );
}

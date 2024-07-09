import { EmptyNotes } from "@/components/empty-notes";
import { NoteCard } from "@/components/note-card";
import { buttonVariants } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import { auth } from "@/auth";
import { AccountModal } from "@/components/Navbar";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import { NewNoteBtn } from "./new-note-button";

export default async function NotebookPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const notebookData = await db.notebook.findUnique({
    where: { id: params.id, userId: session.user.id },
  });
  if (!notebookData) notFound();
  const notes = await db.note.findMany({
    where: { notebookId: params.id },
    select: { id: true, title: true, placeholder: true, visibility: true },
  });
  return (
    <section>
      {/* TODO: abstract header into a separate component with search bar as children */}
      <header className=" md:h-[60px] px-6 items-center md:border-b md:flex justify-between">
        <h1 className="block font-semibold text-xl md:text-2xl">
          {notebookData.name}
        </h1>
        <div className="flex items-center">
          <div className="hidden md:flex gap-6">
            <div
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className:
                    " hidden md:inline-flex w-64 justify-start cursor-text",
                })
              )}
            >
              <div>Search....</div>
            </div>
            <AccountModal />
          </div>
        </div>
      </header>
      <section className=" md:px-6 flex flex-col gap-3 pt-3 pb-4   md:pb-0 ">
        <NewNoteBtn
          notebookId={params.id}
          className="ml-auto flex max-md:mr-6"
        />
        <ScrollArea className="  h-[calc(100vh-10rem)] relative  md:h-[calc(100vh-9rem)]   ">
          <div className="grid gap-4 px-5 md:p-3 ">
            {notes?.length === 0 ? (
              <EmptyNotes notebookId={params.id} />
            ) : (
              notes?.map((note) => <NoteCard note={note} key={note.id} />)
            )}
          </div>
        </ScrollArea>
      </section>
    </section>
  );
}

import { NoteCard } from "@/components/note-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authRedirect } from "@/lib/authredirect";
import { createServerClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { Book } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function NotebookPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  await authRedirect();
  const { data: notebookData, error: notebookError } = await supabase
    .from("notebook")
    .select("*")
    .eq("id", params.id)
    .single();
  if (!notebookData) notFound();
  const { data: notes, error } = await supabase
    .from("notes")
    .select(`id,title,content`)
    .eq("notebookId", params.id);
  return (
    <section>
      {/* TODO: abstract header into a separate component with search bar as children */}
      <header className=" md:h-[60px] px-6 items-center md:border-b md:flex justify-between">
        <h1 className="block font-semibold text-xl md:text-2xl">
          {notebookData.name}
        </h1>
        <div className="flex gap-6">
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
          <div className="hidden  md:block w-10 aspect-square rounded-full bg-primary/50" />
        </div>
      </header>
      <section className=" md:px-6 flex flex-col gap-3 pt-3 pb-4   md:pb-0 ">
        <div className="px-6 md:px-0 flex items-center justify-end md:justify-between">
          <Button className="flex ml-auto max-sm:px-2.5 max-sm:py-2  text-xs md:text-base">
            <PlusIcon className=" w-4  md:w-5   aspect-square mr-2" />
            New Note
          </Button>
        </div>
        <ScrollArea className="    md:h-[calc(100vh-9rem)]   ">
          <div className="grid gap-4 px-5 md:p-3">
            {notes?.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}
          </div>
        </ScrollArea>
      </section>
    </section>
  );
}

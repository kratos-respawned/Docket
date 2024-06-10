import { Button, buttonVariants } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { notFound, useRouter } from "next/navigation";
import { Backbutton } from "./backbutton";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function NotePage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: note, error } = await supabase
    .from("notes")
    .select(`title,html,id,viewable,editable,userid`)
    .eq("id", params.id)
    .single();
  const { data: session, error: userError } = await supabase.auth.getUser();
  if (error || !note) notFound();
  return (
    <>
      <main className="  px-4 sm:px-10 md:px-16 py-8 ">
        <div className="flex items-center justify-between">
          <Backbutton />
          {(session?.user?.id === note.userid || note.editable) && (
            <Link href={`/editor/${note.id}`} className={cn(buttonVariants())}>
              <Pencil className="w-4 h-4 cursor-pointer mr-2" />
              Edit
            </Link>
          )}
        </div>
        <section className="prose px-4 md:px-8 mt-4 max-w-4xl mx-auto break-all">
          <h1>{note.title}</h1>
          <section dangerouslySetInnerHTML={{ __html: note.html || "" }} />
        </section>
      </main>
    </>
  );
}

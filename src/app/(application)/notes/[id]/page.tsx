import { Button, buttonVariants } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { notFound, useRouter } from "next/navigation";
import { Backbutton } from "./backbutton";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function NotePage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: session, error: sessionError } = await supabase.auth.getUser();
  if (sessionError) throw sessionError;
  if (!session.user) notFound();
  const { data: note, error } = await supabase
    .from("notes")
    .select(`title,html,id`)
    .eq("id", params.id)
    .single();
  if (error || !note) return "Not found";
  return (
    <>
      {/* <Button onClick={() => router.back()}>Back</Button> */}
      <main className=" container px-4 sm:px-10 md:px-16 py-8 ">
        <div className="flex items-center justify-between">
          <Backbutton />
          <Link href={`/editor/${note.id}`} className={cn(buttonVariants())}>
            <Pencil className="w-5 h-5 cursor-pointer" />
            Edit
          </Link>
        </div>
        <section className="prose px-4 md:px-8 mt-4 max-w-4xl">
          <h1>{note.title}</h1>
          <section  dangerouslySetInnerHTML={{ __html: note.html || "" }} />
        </section>
      </main>
    </>
  );
}

import TailwindEditor from "@/components/TailwindEditor";
import { Editor } from "./Editor";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
// import TextArea from "react-textarea-autosize";
export default async function EditorPage({
  params,
}: {
  params: { noteid: string };
}) {
  const supabase = createServerClient();
  // const { data: note, error } = await supabase
  //   .from("notes")
  //   .select(`title,json,id,notebookid`)
  //   .eq("id", params.noteid)
  //   .single();
  console.log(params.noteid);
  const { data: note, error } = await supabase
    .from("notes")
    .select(`title,json,id,notebookid`)
    .eq("id", params.noteid)
    .single();
  if (error || !note) notFound();
  return <>{<Editor note={note} />}</>;
}

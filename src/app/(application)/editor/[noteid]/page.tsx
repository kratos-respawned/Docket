import TailwindEditor from "@/components/TailwindEditor";
import { Editor } from "./Editor";
import { createServerClient } from "@/lib/supabase/server";
// import TextArea from "react-textarea-autosize";
export default async function EditorPage({
  params,
}: {
  params: { noteid: string };
}) {
  const supabase = createServerClient();
  const { data: note, error } = await supabase
    .from("notes")
    .select(`title,content`)
    .eq("id", params.noteid)
    .single();
  return <>{note ? <Editor note={note} /> : "not found"}</>;
}

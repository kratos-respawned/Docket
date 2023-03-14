
import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import supabase from "@/lib/supabaseClient"
import type { Metadata } from "next";
import useNoteStore from "@/store/noteStore";
import { Note } from "@/typings/note";
import NotesSection from "@/components/NotesSection";

export const metadata: Metadata = {
  title: "Docket",
  description: "A simple note taking app",
  keywords: "notes, note taking, note taking app, docket",
};

export default async function Home() {
  let { data, error }: { data: Note[], error: any } = await supabase.from('notes').select('*') as any;
  if (error) return <h1>error</h1>
  useNoteStore.setState({ notes: data });
  return (
    <>
      <Aside />
      <ScrollArea className=" w-full pl-10  h-screen py-5 ">
        <SearchBar />
        <h2 className="font-yeserva pl-1 text-6xl mt-7">NOTES</h2>
        <NotesSection notes={data} />
      </ScrollArea>

    </>);
}



import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";
import { Edit } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area";
import supabase from "@/lib/supabaseClient"
import type { Metadata } from "next";
import Notes from "@/components/Notes";

export const metadata: Metadata = {
  title: "Docket",
  description: "A simple note taking app",
  keywords: "notes, note taking, note taking app, docket",
};

export default async function Home() {

  let { data: notes, error } = await supabase.from('notes').select('*')
  console.log(notes)
  return (
    <>
      <Aside />

      <ScrollArea className=" w-full pl-10  h-screen py-5 ">
        <SearchBar />
        <h2 className="font-yeserva pl-1 text-6xl mt-7">NOTES</h2>
        <section className="h-full w-full flex flex-wrap gap-6 mt-10 ">
          {notes?.map((note) => (
            <Notes key={note.id} {...note} />
          ))}
        </section>
      </ScrollArea>

    </>);
}


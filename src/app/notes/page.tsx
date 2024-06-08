import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";
import type { Metadata } from "next";
import NotesSection from "@/components/NotesSection";

export const metadata: Metadata = {
  title: "Docket",
  description: "A simple note taking app",
  keywords: "notes, note taking, note taking app, docket",
};

export default function Home() {
  return (
    <>
      <Aside />
      <section className=" w-full h-screen overflow-y-visible overflow-x-hidden pl-10   py-5 ">
        <SearchBar />
        <h2 className="font-yeserva pl-1 text-6xl mt-7">NOTES</h2>
        <NotesSection />
      </section>
    </>
  );
}

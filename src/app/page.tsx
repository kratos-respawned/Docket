
import Aside from "@/components/Aside";
import SearchBar from "@/components/SearchBar";

import { ScrollArea } from "@/components/ui/scroll-area";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Docket",
  description: "A simple note taking app",
  keywords: "notes, note taking, note taking app, docket",
};

export default async function Home() {

  return (
    <>
      <Aside />

      <ScrollArea className=" w-full pl-5  h-screen py-5 ">
        <SearchBar />
        <h2 className="font-yeserva pl-1 text-6xl mt-7">NOTES</h2>
        <section className="h-full w-full grid grid-cols-4 ">

        </section>
      </ScrollArea>

    </>);
}


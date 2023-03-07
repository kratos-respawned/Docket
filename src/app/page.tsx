import Aside from "@/components/Aside";
import { Input } from "@/components/ui/Input";
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

      <ScrollArea className=" w-full  h-screen py-5 ">
        <div className="relative my-3 w-2/5 ml-5 " >
          <Input placeholder="Search" className="w-full placeholder:font-montserrat text-xl font-montserrat placeholder:text-xl  outline-none border-none  focus:border-none" />
        </div>
      </ScrollArea>

    </>);
}


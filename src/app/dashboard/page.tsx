import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { Book } from "lucide-react";
import Link from "next/link";

export default function NotebookPage() {
  const Arr = [];
  return (
    <section>
      {/* TODO: abstract header into a separate component with search bar as children */}
      <header className=" md:h-[60px] px-6 items-center md:border-b md:flex justify-between">
        <h1 className="block font-semibold text-xl md:text-2xl">Notebooks</h1>
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
            New Notebook
          </Button>
        </div>
        <ScrollArea className=" md:border   rounded-lg   md:h-[calc(100vh-9rem)]   ">
          <div className="grid gap-4 px-5 md:p-3">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <Link href="/dashboard/notes" key={i} passHref>
                <div className="flex border rounded-md p-3 items-center hover:bg-muted transition-colors  justify-start gap-4">
                  <div className={buttonVariants({size:"icon",className:"h-10 w-10 bg-primary/90 hover:bg-primary/70"})}>
                  <Book  />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Personal</p>
                    <p className="text-xs">5 notes</p>
                  </div>
                </div>
                </Link>
              ))}
          </div>
        </ScrollArea>
      </section>
    </section>
  );
}

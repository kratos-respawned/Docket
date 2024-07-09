import { EmptyNotebook } from "@/components/empty-notebook";
import { NotebookCard } from "@/components/notebook-card";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { auth } from "@/auth";
import { AccountModal } from "@/components/Navbar";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { NewNotebookBtn } from "./new-notebook-button";

export const dynamic = "force-dynamic";
export default async function NotebookPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const data = await db.notebook.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: {
          notes: true,
        },
      },
    },
  });
  return (
    <section>
      <header className=" md:h-[60px] px-6 items-center md:border-b md:flex justify-between">
        <h1 className="block font-semibold text-xl md:text-2xl">Notebooks</h1>
        <div className="flex items-center">
          <div className="hidden md:flex gap-6">
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
            <AccountModal />
          </div>
        </div>
      </header>
      <section className=" md:px-6 flex flex-col gap-3 pt-3 pb-4   md:pb-0 ">
        <NewNotebookBtn className="flex ml-auto max-md:mr-6" />
        <ScrollArea className=" md:border   rounded-lg relative h-[calc(100vh-10rem)]  md:h-[calc(100vh-9rem)]   ">
          <div className="grid gap-4 px-5 md:p-3 ">
            {data?.length === 0 ? (
              <EmptyNotebook />
            ) : (
              data?.map((notebook) => (
                <NotebookCard notebook={notebook} key={notebook.id} />
              ))
            )}
          </div>
        </ScrollArea>
      </section>
    </section>
  );
}

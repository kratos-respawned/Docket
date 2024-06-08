import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Book, FileIcon, MenuIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-dvh md:max-h-screen md:overflow-clip md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="border-r ">
        <div className="flex justify-between flex-wrap py-2 md:py-0 md:h-[60px] items-center px-3 lg:px-6">
          <Button size={"icon"} variant={"secondary"} className="md:hidden">
            <MenuIcon />
          </Button>
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 font-semibold"
          >
            <ReaderIcon className="h-6 w-6" />
            <span className="">Docket</span>
          </Link>
          <div className="block md:hidden w-9 aspect-square rounded-full bg-primary/50" />
        </div>
        <div className="flex-1 md:pt-4">
          {/* 
          TODO: use a drawer component for the navigation in mobile view
          */}
          <nav className="hidden md:grid items-start gap-2 px-2  lg:px-4 text-sm font-medium">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
            >
              <Book className="h-4 w-4" />
              Notebooks
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <FileIcon className="h-4 w-4" />
              All Notes
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>
      {children}
    </main>
  );
}

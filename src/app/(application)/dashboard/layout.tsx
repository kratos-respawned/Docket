import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Book, FileIcon, MenuIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { Menu, MenuBtn } from "./dashboard-menu";
import { MobileNavbar } from "@/components/mobile-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="md:grid min-h-dvh md:max-h-screen md:overflow-clip md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="border-r ">
        <div className="flex justify-between flex-wrap py-2 md:py-0 md:h-[60px] items-center px-3 lg:px-6">
          <MobileNavbar/>
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
         
          <Menu />
        </div>
      </aside>
      {children}
    </main>
  );
}

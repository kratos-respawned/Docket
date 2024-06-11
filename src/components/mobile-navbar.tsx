import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { AlignRight, MenuIcon } from "lucide-react";

export const MobileNavbar = () => {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="   md:hidden">
          <MenuIcon />
          <span className="sr-only">Open Navigation Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}  className="flex flex-col">
        <Link href={"/"} className="font-heading text-3xl text-left">
          Docket
        </Link>
        <nav className=" my-4  flex-1   flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/all"
            className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
          >
            All Notes
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
          >
            Setting
          </Link>

          <Link
            href="#"
            className="text-base transition-all font-medium hover:underline hover:text-primary underline-offset-4"
          >
            Github
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

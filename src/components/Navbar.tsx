import Link from "next/link";
import { Button } from "./ui/button";
import { createServerClient } from "@/utils/supabase/server";

export const Navbar = async () => {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getUser();
  return (
    <header className=" sticky top-0 shadow  z-50 border-b border-border/40 bg-background px-8 lg:px-10 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Trekking Adventures</span>
      </Link>
      <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm  text-foreground  lg:flex  hidden gap-4 sm:gap-6">
        <Link
          href="#"
          className=" transition-colors  hover:underline  hover:text-primary underline-offset-4"
        >
          Trekking
        </Link>
        <Link
          href="#"
          className=" transition-all  hover:underline hover:text-primary underline-offset-4"
        >
          Expedition
        </Link>
        <Link
          href="#"
          className=" transition-all  hover:underline hover:text-primary underline-offset-4"
        >
          Adventure
        </Link>
        <Link
          href="#"
          className=" transition-all  hover:underline hover:text-primary underline-offset-4"
        >
          Holiday
        </Link>
        <Link
          href="tel:+919876543210"
          className=" transition-all  hover:underline hover:text-primary underline-offset-4"
        >
          Contact
        </Link>
      </nav>

      <div className="hidden lg:flex items-center gap-3">
        {!data.user ? <Button>Sign In</Button> : <Button>Sign Out</Button>}
      </div>
    </header>
  );
};

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/actions/logout";
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SignInModal } from "./sign-in-modal";
export const Navbar = async () => {
  const session = await auth();
  return (
    <header className=" sticky top-0 shadow  z-50 border-b border-border/40 bg-background px-8 lg:px-10 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center">
        <ReaderIcon className="h-6 w-6" />
        <span className="sr-only">Docket</span>
      </Link>
      <div className=" flex relative items-center gap-3">
        {session?.user ? (
          <form action={logout}>
            <Button>Sign Out</Button>
          </form>
        ) : (
          <SignInModal />
        )}
      </div>
    </header>
  );
};

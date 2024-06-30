import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";
import { SignInModal } from "./sign-in-modal";
import { buttonVariants } from "./ui/button";
import { UserAccountNav } from "./user-account-nav";
export const Navbar = () => {
  return (
    <header className=" sticky top-0 shadow  z-50 border-b border-border/40 bg-background px-8 lg:px-10 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center">
        <ReaderIcon className="h-6 w-6" />
        <span className="sr-only">Docket</span>
      </Link>
      <div className=" flex relative items-center gap-3">
        <Suspense fallback={<div className={cn(buttonVariants({variant:"secondary"}))}>Loading...</div>}>
          <AccountModal />
        </Suspense>
      </div>
    </header>
  );
};

export const AccountModal = async () => {
  const session = await auth();
  return (
    <>
      {session?.user ? <UserAccountNav user={session.user} /> : <SignInModal />}
    </>
  );
};

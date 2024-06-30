"use client";

import { ReaderIcon } from "@radix-ui/react-icons";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SignInModal } from "./sign-in-modal";
import { Avatar } from "./ui/avatar";
import { UserAccountNav } from "./user-account-nav";
export const Navbar = () => {
  return (
    <header className=" sticky top-0 shadow  z-50 border-b border-border/40 bg-background px-8 lg:px-10 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center">
        <ReaderIcon className="h-6 w-6" />
        <span className="sr-only">Docket</span>
      </Link>
      <div className=" flex relative items-center gap-3">
        <AccountModal />
      </div>
    </header>
  );
};

export const AccountModal = () => {
  const session = useSession();
  if (session.status === "loading")
    return (
      <Avatar className="bg-muted border animate-pulse grid place-items-center">
        <User />
      </Avatar>
    );
  return <>{session?.data?.user ? <UserAccountNav /> : <SignInModal />}</>;
};

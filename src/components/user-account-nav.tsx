"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { UserAvatar } from "@/components/ui/avatar";

import { buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { ReaderIcon } from "@radix-ui/react-icons";
import { createClient } from "@/lib/supabase/client";
import type { User as UserType } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function UserAccountNav({ user }: { user: UserType }) {
  const supabase = createClient();
  const router = useRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              user.user_metadata.avatar_url ||
              "https://api.dicebear.com/8.x/pixel-art/svg"
            }
          />
          <AvatarFallback>
            {((user.user_metadata.name || "Anon") as string)
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.user_metadata.name && (
              <p className="font-medium">{user.user_metadata.name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <ReaderIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <button>Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

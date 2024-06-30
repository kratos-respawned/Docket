import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { logout } from "@/lib/auth/actions/logout";
import { ReaderIcon } from "@radix-ui/react-icons";
import { LogOut, UserIcon } from "lucide-react";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function UserAccountNav({user}:{user:User}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              user.image ||
              "https://api.dicebear.com/8.x/pixel-art/svg"
            }
          />
          <AvatarFallback>
            {((user.name || "Anon") as string)
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" aria-hidden="true" />
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
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <button>Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

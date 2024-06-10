"use client";
import { cn } from "@/lib/utils";
import { Book, FileIcon, LucideIcon, SettingsIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
export const Menu = () => {
  return (
    <nav className="hidden md:grid items-start gap-2 px-2  lg:px-4 text-sm font-medium">
      <MenuBtn
        title="Notebooks"
        Icon={Book}
        href="/dashboard"
        key={"dashboard"}
      />
      <MenuBtn
        Icon={FileIcon}
        title="All Notes"
        href="/dashboard/all"
        key={"all"}
      />
      <MenuBtn
        href="/dashboard/settings"
        Icon={SettingsIcon}
        title="Settings"
        key={"settings"}
      />
    </nav>
  );
};
export const MenuBtn = ({
  href,
  Icon,
  title,
}: {
  href: string;
  Icon: LucideIcon;
  title: string;
}) => {
  const pathname = usePathname();
  const condition =
    href === "/dashboard"
      ? pathname.startsWith("/dashboard/notebook/")
        ? true
        : pathname === "/dashboard"
      : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ",
        condition &&
          "text-gray-900 bg-gray-100  hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
      )}
    >
      <Icon className="h-4 w-4" />
      {title}
    </Link>
  );
};

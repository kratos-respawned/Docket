"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Book } from "lucide-react";
import { Tables } from "@/typings/supabase";

export const NotebookCard = ({
  notebook,
}: {
  notebook: Tables<"notebook"> & {
    notes: {
      count: number;
    }[];
  };
}) => {
  return (
    <Link href={`/dashboard/${notebook.id}`} passHref>
      <div className="flex border rounded-md p-3 items-center hover:bg-muted transition-colors  justify-start gap-4">
        <div
          className={buttonVariants({
            size: "icon",
            className: "h-10 w-10 bg-primary/90 hover:bg-primary/70",
          })}
        >
          <Book />
        </div>
        <div>
          <p className="font-bold text-sm">{notebook.name}</p>
          <p className="text-xs">{notebook.notes.at(0)?.count} notes</p>
        </div>
      </div>
    </Link>
  );
};

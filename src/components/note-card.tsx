"use client";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Check,
  CheckCheck,
  Delete,
  EllipsisVertical,
  Eye,
  EyeOff,
  Pencil,
  PencilIcon,
  Share2,
  ShareIcon,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const NoteCard = ({
  note,
}: {
  note: {
    id: string;
    title: string;
    placeholder: string;
    viewable: boolean;
    editable: boolean;
  };
}) => {
  const router = useRouter();
  const supabase = createClient();
  const toggleVisibility = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({ viewable: !note.viewable })
      .eq("id", note.id);
    if (!error) router.refresh();
    else console.log(error);
  };
  const toggleSharing = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({ editable: !note.editable })
      .eq("id", note.id);
    if (!error) router.refresh();
    else console.log(error);
  };
  const deleteNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", note.id);
    if (!error) router.refresh();
    else console.log(error);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between ">
          <div>
            <Link
              href={`/notes/${note.id}`}
              className="text-lg font-medium hover:underline text-gray-900 dark:text-gray-50"
            >
              {note.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500 line-clamp-1 dark:text-gray-400">
              {note.placeholder}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="items-center gap-2"
                onClick={() => router.push(`/editor/${note.id}`)}
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2" onClick={toggleVisibility}>
                {note.viewable ? (
                  <span className="gap-2 flex items-center">
                    <EyeOff className="w-4 h-4 mr-2" />
                    Disable Viewing
                  </span>
                ) : (
                  <span className="gap-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Enable Viewing
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between gap-6"
                onClick={toggleSharing}
              >
                {note.editable ? (
                  <span className="gap-2 flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Disable Sharing
                  </span>
                ) : (
                  <span className="gap-2 flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Enable Sharing
                  </span>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2" onClick={deleteNote}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

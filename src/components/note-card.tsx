"use client";
import {
  deleteNoteAction,
  toggleSharingAction,
  toggleVisibilityAction,
} from "@/app/(application)/noteActions";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { visibility } from "@prisma/client";
import {
  EllipsisVertical,
  Eye,
  EyeOff,
  PencilIcon,
  Share2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const NoteCard = ({
  note,
}: {
  note: {
    id: string;
    title: string;
    visibility: visibility;
    placeholder: string;
  };
}) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const deleteNote = () => {
    startTransition(async () => {
      const { success, error } = await deleteNoteAction(note.id);
      if (success) router.refresh();
      else
        toast("Error", {
          description: error,
        });
    });
  };
  const toggleSharing = async () => {
    startTransition(async () => {
      const { success, error } = await toggleSharingAction(
        note.visibility,
        note.id
      );
      if (error) {
        toast("Error", {
          description: error,
        });
        return;
      }

      if (note.visibility === "readOnly") {
        toast("Sharing Enabled", {
          description: success,
          action: {
            label: "Copy Link",
            onClick: () =>
              navigator.clipboard.writeText(
                `${env.NEXT_PUBLIC_APP_URL}/editor/${note.id}`
              ),
          },
        });
      } else {
        toast("Sharing Disabled", {
          description: "This note can no longer be edited by others",
        });
      }
      router.refresh();
    });
  };
  const toggleVisibility = async () => {
    startTransition(async () => {
      const { success, error } = await toggleVisibilityAction(
        note.visibility,
        note.id
      );
      if (error) {
        toast("Error", {
          description: error,
        });
        return;
      }

      if (note.visibility === "restricted") {
        toast("Sharing Enabled", {
          description: success,
          action: {
            label: "Copy Link",
            onClick: () =>
              navigator.clipboard.writeText(
                `${env.NEXT_PUBLIC_APP_URL}/notes/${note.id}`
              ),
          },
        });
      } else {
        toast("Sharing Disabled", {
          description: "This note can no longer be viewed by others",
        });
      }
      router.refresh();
    });
  };

  return (
    <Card className={cn(isPending && "opacity-50 pointer-events-none")}>
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
                {note.visibility === "restricted" ? (
                  <span className="gap-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Enable Viewing
                  </span>
                ) : (
                  <span className="gap-2 flex items-center">
                    <EyeOff className="w-4 h-4 mr-2" />
                    Disable Viewing
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between gap-6"
                onClick={toggleSharing}
              >
                {note.visibility !== "editable" ? (
                  <span className="gap-2 flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Enable Sharing
                  </span>
                ) : (
                  <span className="gap-2 flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Disable Sharing
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

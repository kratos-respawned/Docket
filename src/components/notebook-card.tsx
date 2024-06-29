"use client";

import {
  deleteNotebookAction,
  editNotebookAction,
} from "@/app/(application)/dashboard/notebook-actions";
import { cn } from "@/lib/utils";
import { newNotebookSchema } from "@/validators/new-notebook-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Book,
  EllipsisVertical,
  Loader2,
  PencilIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export const NotebookCard = ({
  notebook,
}: {
  notebook: {
    _count: {
      notes: number;
    };
  } & {
    id: string;
    userId: string;
    name: string;
  };
}) => {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, startTransition] = useTransition();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const form = useForm<newNotebookSchema>({
    resolver: zodResolver(newNotebookSchema),
    defaultValues: {
      title: notebook.name,
    },
  });
  const editNotebook = async (values: newNotebookSchema) => {
    startTransition(async () => {
      const { error, success } = await editNotebookAction(
        values.title,
        notebook.id
      );
      if (!error) {
        setEditDialogOpen(false);
        toast("Success", { description: success });
        router.refresh();
      } else toast("Error", { description: error });
    });
  };
  const deleteNotebook = async () => {
    startTransition(async () => {
      const { success, error } = await deleteNotebookAction(notebook.id);
      if (!error) {
        setDeleteDialogOpen(false);
        router.refresh();
      } else console.log(error);
    });
  };
  return (
    <div className="flex border rounded-md p-3 items-center  transition-colors  justify-between gap-4">
      <div className="flex justify-start items-center gap-4">
        <div
          className={buttonVariants({
            size: "icon",
            className: "h-10 w-10 bg-primary/90 hover:bg-primary/70",
          })}
        >
          <Book />
        </div>
        <div>
          <Link
            href={`/dashboard/notebook/${notebook.id}`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "p-0 h-fit font-bold"
            )}
          >
            {notebook.name}
          </Link>
          <p className="text-xs mt-0">{notebook._count.notes} notes</p>
        </div>
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
            onClick={() => setEditDialogOpen(true)}
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/*  */}
      <Dialog
        open={editDialogOpen}
        onOpenChange={(newState) => {
          if (loading) {
            toast("Error", {
              description: "Please wait for the current action to complete",
            });
            return;
          }
          setEditDialogOpen(newState);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Notebook</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editNotebook)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notebook Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Personal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="mt-3">
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(newState) => {
          if (loading) {
            toast("Error", {
              description: "Please wait for the current action to complete",
            });
            return;
          }
          setDeleteDialogOpen(newState);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Notebook</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notebook? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button disabled={loading} variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              variant={"destructive"}
              onClick={deleteNotebook}
            >
              {loading ? "Deleting" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

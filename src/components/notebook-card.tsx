"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  Book,
  EllipsisVertical,
  Loader2,
  PencilIcon,
  Trash2,
} from "lucide-react";
import { Tables } from "@/typings/supabase";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newNotebookSchema } from "@/validators/new-notebook-schema";
import { createClient } from "@/lib/supabase/client";

export const NotebookCard = ({
  notebook,
}: {
  notebook: Tables<"notebook"> & {
    notes: {
      count: number;
    }[];
  };
}) => {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const supabase = createClient();
  const form = useForm<newNotebookSchema>({
    resolver: zodResolver(newNotebookSchema),
    defaultValues: {
      title: notebook.title,
    },
  });
  const editNotebook = async (values: newNotebookSchema) => {
    const { data, error } = await supabase
      .from("notebook")
      .update(values)
      .eq("id", notebook.id);
    if (!error) {
      setEditDialogOpen(false);
      router.refresh();
    } else console.log(error);
  };
  const deleteNotebook = async () => {
    setIsLoading(true);
    const { error } = await supabase
      .from("notebook")
      .delete()
      .eq("id", notebook.id);
    setIsLoading(false);
    if (!error) {
      setDeleteDialogOpen(false);
      router.refresh();
    } else console.log(error);
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
            {notebook.title}
          </Link>
          <p className="text-xs mt-0">{notebook.notes.at(0)?.count} notes</p>
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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

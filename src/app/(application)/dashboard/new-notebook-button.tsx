"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { newNotebookSchema } from "@/validators/new-notebook-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createNotebookAction } from "./notebook-actions";

export const NewNotebookBtn = ({ className }: { className?: string }) => {
  const form = useForm<newNotebookSchema>({
    resolver: zodResolver(newNotebookSchema),
    defaultValues: {
      title: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [isloading, startTransition] = useTransition();
  const createNotebook = async (values: newNotebookSchema) => {
    startTransition(async () => {
      const { success, error } = await createNotebookAction(values.title);
      if (error) {
        toast.error("Error", {
          description: error,
        });
        return;
      }
      toast.success("Success", {
        description: success,
      });
      form.reset();
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant="default">
          <PlusIcon className=" w-4  md:w-5   aspect-square mr-2" /> New
          Notebook
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "sm:max-w-[425px] transition-opacity",
          isloading && "opacity-60 pointer-events-none"
        )}
      >
        <DialogHeader>
          <DialogTitle>New Notebook</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createNotebook)}>
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
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

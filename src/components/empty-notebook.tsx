"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { newNotebookSchema } from "@/validators/new-notebook-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { createNewNotebook } from "@/app/(application)/dashboard/notebook-actions";
import { Loader2 } from "lucide-react";

export const EmptyNotebook = () => {
  const form = useForm<newNotebookSchema>({
    resolver: zodResolver(newNotebookSchema),
    defaultValues: {
      title: "",
    },
  });
  const [open, setOpen] = useState(false);
  const createNotebook = async (values: newNotebookSchema) => {
    try {
      await createNewNotebook(values);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
  };
  return (
    <div className=" absolute inset-0 flex items-center justify-center ">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          No notebook found
        </h2>
        <p className="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-400">
          Create a notebook to get started
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">New Notebook</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
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
      </div>
    </div>
  );
};

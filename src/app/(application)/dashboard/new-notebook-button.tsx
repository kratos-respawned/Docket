"use client"
import { useSupabaseClient } from "@/lib/supabase/client";
import { newNotebookSchema } from "@/validators/new-notebook-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { revalidateNotebook } from "./notebook-actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";

export const NewNotebookBtn = ({ className }: { className?: string }) => {
  const form = useForm<newNotebookSchema>({
    resolver: zodResolver(newNotebookSchema),
    defaultValues: {
      title: "",
    },
  });
  const [open, setOpen] = useState(false);
  const supabase = useSupabaseClient();
  const createNotebook = async (values: newNotebookSchema) => {
    try {
      const { data: session, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error("Invalid User");
      const { data: notebook, error } = await supabase
        .from("notebook")
        .insert({ ...values, userid: session.user.id });
      await revalidateNotebook();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant="default">
          <PlusIcon className=" w-4  md:w-5   aspect-square mr-2" /> New
          Notebook
        </Button>
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
  );
};

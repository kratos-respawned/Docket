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

import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { revalidateNotebook } from "@/app/(application)/dashboard/notebook-actions";
import { NewNotebookBtn } from "@/app/(application)/dashboard/new-notebook-button";

export const EmptyNotebook = () => {
  return (
    <div className=" absolute inset-0 flex items-center justify-center ">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          No notebook found
        </h2>
        <p className="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-400">
          Create a notebook to get started
        </p>
        <NewNotebookBtn />
      </div>
    </div>
  );
};

import { z } from "zod";

export const newNotebookSchema = z.object({
  title: z.string().min(3).max(100),
});
export type newNotebookSchema = z.infer<typeof newNotebookSchema>;

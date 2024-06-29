import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(100),
  content: z.any(),
  Html: z.string(),
  placeholder: z.string(),
  notebookId: z.string(),
  visibility: z.enum(["readOnly", "editable", "restricted"]),
});
export type NoteSchema = z.infer<typeof NoteSchema>;

import { Note } from "@/typings/note";
import axios from "axios";

export const deleteNote = async (id: number, notes: Note[]) => {
  const { data } = await axios.post("/api/deleteNote", { id: id });
  if (data === "success") {
    return notes.filter((note: Note) => note.id !== id);
  }
  throw new Error("error occured");
};

export const deleteNoteOptions = (id: number, notes: Note[]) => {
  return {
    optimisticData: notes.filter((note: Note) => note.id !== id),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

import { Note } from "@/typings/note";
import axios from "axios";

export const addNote = async (accent: string, id: number, notes: Note[]) => {
  const { data } = await axios.post("/api/addNote", { accent: accent, id: id });

  return [data, ...notes].sort((a: Note, b: Note) => b.timestamp - a.timestamp);
};

export const addNoteOptions = (accent: string, id: number, notes: Note[]) => {
  const newNote: Note = {
    id: id,
    accent: accent,
    content: "",
    editing: false,
    timestamp: new Date().getTime(),
  };
  return {
    optimisticData: [newNote, ...notes].sort(
      (a: Note, b: Note) => b.timestamp - a.timestamp
    ),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

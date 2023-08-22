import { Note } from "@/typings/note";
import axios from "axios";

export const mutateNote = async (mutatedNote: Note, notes: Note[]) => {
  const { data } = await axios.post("/api/mutateNote", {
    ...mutatedNote,
  });
  return notes
    .map((note: Note) => {
      if (note.id === data.id) {
        return data;
      }
      return note;
    })
    .sort((a: Note, b: Note) => Number(b.timestamp) - Number(a.timestamp));
};

export const mutateNoteOptions = (mutatedNote: Note, notes: Note[]) => {
  return {
    optimisticData: notes
      .map((note: Note) => {
        if (note.id === mutatedNote.id) {
          return mutatedNote;
        }
        return note;
      })
      .sort((a: Note, b: Note) =>Number(b.timestamp) - Number(a.timestamp)),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

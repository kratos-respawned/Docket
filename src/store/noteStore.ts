import { create } from "zustand";
import { Note } from "@/typings/note";
type NoteStore = {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  modifyNote: (id: string, note: Note) => void;
};

const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  deleteNote: (id: string) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  modifyNote: (id: string, note: Note) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...note } : note
      ),
    })),
}));

export default useNoteStore;

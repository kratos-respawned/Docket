import { create } from "zustand";
import { Note } from "@/typings/note";
type NoteStore = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string | number) => void;
  modifyNote: (id: string | number, note: Note) => void;
};

const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  setNotes: (notes: Note[]) => set({ notes }),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  deleteNote: (id: string | number) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  modifyNote: (id: string | number, note: Note) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...note } : note
      ),
    })),
}));

export default useNoteStore;

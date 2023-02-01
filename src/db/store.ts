import { create } from "zustand";
interface Note {
    id: string;
    content: string;
    accent: string;
    lastModified: Date;
}
type NoteState = {
    notes: Note[];
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, newNote: Note[]) => void;
};
export const useNotes = create<NoteState>((set) => ({
    notes: [] as Note[],
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
    updateNote: (id, note) => set((state) => ({ notes: state.notes.map((note) => (note.id === id ? note : note)) })),
}))
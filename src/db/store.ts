import { create } from "zustand";
export interface Note {
    id: string;
    content: string;
    accent: string;
    editing: boolean;
    lastModified: string;
}
type NoteState = {
    notes: Note[];
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, newNote: Note) => void;
    emptyNotes: () => void;
};
export const useNotes = create<NoteState>((set) => ({
    notes: [] as Note[],
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
    updateNote: (id, newNote) => set((state) => ({
        notes: state.notes.map((note) => {
            return note.id === id ? newNote : note;
        })
    })),
    emptyNotes: () => set(() => ({ notes: [] }))

}))
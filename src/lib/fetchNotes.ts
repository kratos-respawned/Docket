import { Note } from "@/typings/note";

const fetchNotes = () =>
  fetch("/api/getNotes").then(async (res) => {
    const data = await res.json();
    if (!data || !data.notes) {
      const temp: Note[] = [];
      return temp;
    }
    return data.notes as Note[];
  });

export default fetchNotes;

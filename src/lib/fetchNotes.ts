const fetchNotes = () => fetch("/api/getNotes").then((res) => res.json());

export default fetchNotes;

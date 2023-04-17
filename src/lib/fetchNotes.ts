const fetchNotes = () =>
  fetch("/api/getNotes").then(async (res) => {
    const data = await res.json();
    return data;
  });

export default fetchNotes;

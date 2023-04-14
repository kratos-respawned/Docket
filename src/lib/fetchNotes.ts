const fetchNotes = () =>
  fetch("/api/getNotes").then(async (res) => {
    return res.json();
  });

export default fetchNotes;

import axios from "axios";

const fetchNotes = () => axios.post("/api/getNotes").then((res) => res.data);

export default fetchNotes;

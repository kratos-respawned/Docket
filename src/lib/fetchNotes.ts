import axios from "axios";

const fetchNotes = () => axios.get("/api/getNotes").then((res) => res.data);

export default fetchNotes;

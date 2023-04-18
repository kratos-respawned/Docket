import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  id: Number,
  content: String,
  timestamp: Number,
  editing: Boolean,
  accent: String,
});

const NoteModel = model("Note", noteSchema);
export default NoteModel;

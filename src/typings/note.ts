export interface Note {
  id: string;
  content: string;
  accent: "gold" | "orange" | "purple" | "blue" | "lime";
  editing: boolean;
  lastModified: string;
}

import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export const NoteCard = ({
  note,
}: {
  note: {
    id: string;
    title: string;
    placeholder: string;
  };
}) => (
  <Link href={`/editor/${note.id}`} passHref>
    <Card className="hover:bg-muted">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
              {note.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500 line-clamp-1 dark:text-gray-400">
              {note.placeholder}
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            May 12, 2023
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

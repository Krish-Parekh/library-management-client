import { BookIcon } from "lucide-react";
import React from "react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center">
      <BookIcon className="h-12 w-12 text-gray-400" />
      <h3 className="text-2xl font-bold tracking-tight">
        No books uploaded yet
      </h3>
      <p>Looks like admin hasn&apos;t uploaded any books to your library.</p>
    </div>
  );
}

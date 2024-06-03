import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/main";

interface IBookCardProps {
  book: Book;
}

export default function BookCard({ book }: IBookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{book.categoryId.name}</Badge>
          <Badge variant="outline">{book.isbn}</Badge>
          <Badge variant="outline">{book.authorId.name}</Badge>
        </div>
        <Button>Download</Button>
      </CardContent>
    </Card>
  );
}

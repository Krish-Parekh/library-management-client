"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  isbn: string;
  category: string;
}

export const bookDummyData: Book[] = [
  {
    id: "1",
    title: "Book 1",
    description: "Description 1",
    author: "Author 1",
    isbn: "123456",
    category: "Fiction",
  },
  {
    id: "2",
    title: "Book 2",
    description: "Description 2",
    author: "Author 2",
    isbn: "123457",
    category: "Non-Fiction",
  },
  {
    id: "3",
    title: "Book 3",
    description: "Description 3",
    author: "Author 3",
    isbn: "123458",
    category: "Self-Help",
  },
];

export const bookTableColumns: ColumnDef<Book>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "author",
    header: "Author",
    accessorKey: "author",
  },
  {
    id: "isbn",
    header: "ISBN",
    accessorKey: "isbn",
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => {
      return <Badge>{row.getValue("category")}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

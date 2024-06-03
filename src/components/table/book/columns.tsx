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
import { Book } from "@/types/main";

export const bookTableColumns: ColumnDef<Book>[] = [
  {
    id: "_id",
    header: "ID",
    accessorKey: "_id",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
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

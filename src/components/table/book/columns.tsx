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
import { Author, Book, Category } from "@/types/main";
import DeleteItem from "../DeleteItem";
import TrashItem from "../TrashItem";
import EditItem from "../EditItem";

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
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "authorId",
    header: "Author",
    accessorKey: "authorId",
    cell: ({ row }) => {
      const author = row.getValue("authorId") as Author;
      return author ? author.name : "NA";
    },
  },
  {
    id: "isbn",
    header: "ISBN",
    accessorKey: "isbn",
  },
  {
    id: "categoryId",
    header: "Category",
    accessorKey: "categoryId",
    cell: ({ row }) => {
      const category = row.getValue("categoryId") as Category;
      return category ? <Badge>{category.name}</Badge> : "N/A";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      const url = `/book/${id}/`;
      return (
        <div className="flex gap-x-4 justify-end">
          <TrashItem
            url={url}
            revalidationURL={["/author/", "/book/", "/category/"]}
          />
          <EditItem id={id} type="books" />
        </div>
      );
    },
  },
];

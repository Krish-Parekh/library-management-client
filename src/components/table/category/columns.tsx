"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Author, Category } from "@/types/main";
import DeleteItem from "../DeleteItem";
import TrashItem from "../TrashItem";

export const categoryTableColumns: ColumnDef<Category>[] = [
  {
    id: "_id",
    header: "ID",
    accessorKey: "_id",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      const url = `/category/${id}/`;
      return (
        <TrashItem
          url={url}
          revalidationURL={["/category/", "/author/", "/book/"]}
        />
      );
    },
  },
];

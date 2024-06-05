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
import EditItem from "../EditItem";

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
        <div className="flex gap-x-4 justify-end">
          <TrashItem
            url={url}
            revalidationURL={["/category/", "/author/", "/book/"]}
          />
          <EditItem id={id} type="categories" />
        </div>
      );
    },
  },
];

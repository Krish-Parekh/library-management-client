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
import { Author } from "@/types/main";
import DeleteItem from "../DeleteItem";
import TrashItem from "../TrashItem";
import EditItem from "../EditItem";

export const authorTableColumns: ColumnDef<Author>[] = [
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
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      const url = `/author/${id}/`;
      return (
        <div className="flex gap-x-4 justify-end">
          <TrashItem
            url={url}
            revalidationURL={["/author/", "/book/", "/category/"]}
          />
          <EditItem id={id} type="authors" />
        </div>
      );
    },
  },
];

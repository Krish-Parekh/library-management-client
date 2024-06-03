"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { User } from "@/types/main";
import DeleteItem from "../DeleteItem";
import { Button } from "@/components/ui/button";
import { DeleteIcon } from "lucide-react";
import TrashItem from "../TrashItem";
import EditItem from "../EditItem";

export const userTableColumns: ColumnDef<User>[] = [
  {
    id: "_id",
    header: "ID",
    accessorKey: "_id",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    id: "username",
    header: "Username",
    accessorKey: "username",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      const url = `/user/${id}/`;
      return (
        <div className="flex gap-x-4 justify-end">
          <TrashItem url={url} revalidationURL={["/user/"]} />
          <EditItem />
        </div>
      );
    },
  },
];

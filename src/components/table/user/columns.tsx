"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { User } from "@/types/main";
import DeleteItem from "../DeleteItem";

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
      const role = row.original.role;
      const url = `/user/${id}/`;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {role !== "admin" && (
              <DeleteItem url={url} revalidateURL={["/user/"]} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const userDummyData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Parekh",
    email: "jane@gmail.com",
    role: "User",
  },
  {
    id: "3",
    name: "Alice",
    email: "alice@gmail.com",
    role: "User",
  },
  {
    id: "4",
    name: "Bob",
    email: "bob@gmail.com",
    role: "User",
  },
  {
    id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Parekh",
    email: "jane@gmail.com",
    role: "User",
  },
  {
    id: "3",
    name: "Alice",
    email: "alice@gmail.com",
    role: "User",
  },
  {
    id: "4",
    name: "Bob",
    email: "bob@gmail.com",
    role: "User",
  },
];

export const userTableColumns: ColumnDef<User>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
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

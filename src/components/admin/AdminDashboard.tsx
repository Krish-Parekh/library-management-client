"use client";

import React from "react";
import MaxWidthContainer from "../MaxWidthContainer";
import Navbar from "../Navbar";
import StatCard from "../StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useLibraryUser from "@/hooks/useLibraryUser";
import useLibraryBook from "@/hooks/useLibraryBook";
import DataTable from "../table/DataTable";
import { userTableColumns } from "../table/user/columns";
import { bookTableColumns } from "../table/book/columns";

export default function AdminDashboard() {
  const { users, userLoading } = useLibraryUser();
  const { books, bookLoading } = useLibraryBook();

  return (
    <MaxWidthContainer>
      <Navbar username="Admin" />
      <div className="flex gap-x-4">
        <StatCard
          title="Users"
          count={users ? users.length : 0}
          isLoading={userLoading}
          type="users"
        />
        <StatCard
          title="Books"
          count={books ? books.length : 0}
          isLoading={bookLoading}
          type="books"
        />
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex">
          <TabsTrigger className="flex-1" value="users">
            Users
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="books">
            Books
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          {users && <DataTable columns={userTableColumns} data={users} />}
        </TabsContent>
        <TabsContent value="books">
          {books && <DataTable columns={bookTableColumns} data={books} />}
        </TabsContent>
      </Tabs>
    </MaxWidthContainer>
  );
}

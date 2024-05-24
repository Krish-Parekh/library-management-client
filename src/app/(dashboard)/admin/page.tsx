import MaxWidthContainer from "@/components/MaxWidthContainer";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/table/DataTable";
import { userTableColumns, userDummyData } from "@/components/table/user/columns";
import { bookTableColumns, bookDummyData } from "@/components/table/book/columns";

export default function page() {
  return (
    <MaxWidthContainer>
      <Navbar username="Admin" />
      <div className="flex gap-x-4">
        <StatCard title="Users" value="10" icon="users" />
        <StatCard title="Books" value="20" icon="books" />
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
          <DataTable columns={userTableColumns} data={userDummyData} />
        </TabsContent>
        <TabsContent value="books">
          <DataTable columns={bookTableColumns} data={bookDummyData} />
        </TabsContent>
      </Tabs>
    </MaxWidthContainer>
  );
}

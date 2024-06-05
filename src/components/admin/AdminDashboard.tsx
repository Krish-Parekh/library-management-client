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
import useLibraryAuthor from "@/hooks/useLibraryAuthor";
import { authorTableColumns } from "../table/author/column";
import useLibraryCategory from "@/hooks/useLibraryCategory";
import { categoryTableColumns } from "../table/category/columns";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import LoginForm from "../forms/LoginForm";
import useSearchParams from "@/hooks/useSearchParams";
import UserEditForm from "../forms/UserEditForm";
import BookForm from "../forms/BookForm";
import AuthorForm from "../forms/AuthorForm";
import CategoryForm from "../forms/CategoryForm";

export default function AdminDashboard() {
  const { users, userLoading } = useLibraryUser();
  const { books, bookLoading } = useLibraryBook({ search: "" });
  const { authors, authorLoading } = useLibraryAuthor();
  const { categories, categoryLoading } = useLibraryCategory();
  const { get, updateSearchParams } = useSearchParams();
  const id = get("id");
  const type = get("type");
  return (
    <MaxWidthContainer>
      <Navbar username="Admin" />
      <div className="flex gap-x-4">
        <StatCard
          title="Users"
          count={users ? users.data.length : 0}
          isLoading={userLoading}
          type="users"
        />
        <StatCard
          title="Books"
          count={books ? books.data.length : 0}
          isLoading={bookLoading}
          type="books"
        />
        <StatCard
          title="Authors"
          count={authors ? authors.data.length : 0}
          isLoading={authorLoading}
          type="authors"
        />
        <StatCard
          title="Categories"
          count={categories ? categories.data.length : 0}
          isLoading={categoryLoading}
          type="categories"
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
          <TabsTrigger className="flex-1" value="authors">
            Authors
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="categories">
            Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          {users && <DataTable columns={userTableColumns} data={users.data} />}
        </TabsContent>
        <TabsContent value="books">
          {books && <DataTable columns={bookTableColumns} data={books.data} />}
        </TabsContent>
        <TabsContent value="authors">
          {authors && (
            <DataTable columns={authorTableColumns} data={authors.data} />
          )}
        </TabsContent>
        <TabsContent value="categories">
          {categories && (
            <DataTable columns={categoryTableColumns} data={categories.data} />
          )}
        </TabsContent>
      </Tabs>
      <Dialog
        open={!!id && !!type}
        onOpenChange={(open: boolean) => {
          if (!open) {
            updateSearchParams({ id: undefined, type: undefined });
          }
        }}
      >
        <DialogContent>
          <DialogTitle>Edit {type}</DialogTitle>
          {type === "users" && <UserEditForm />}
          {type === "books" && <BookForm />}
          {type === "authors" && <AuthorForm />}
          {type === "categories" && <CategoryForm />}
        </DialogContent>
      </Dialog>
    </MaxWidthContainer>
  );
}

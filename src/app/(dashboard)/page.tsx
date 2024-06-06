"use client";

import BookCard from "@/components/BookCard";
import EmptyState from "@/components/EmptyState";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import useLibraryBook from "@/hooks/useLibraryBook";
import useUser from "@/hooks/useUser";
import { dummy_books } from "@/lib/dummy_book";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const { books } = useLibraryBook({ search: input });
  const { data } = useUser();
  return (
    <MaxWidthContainer>
      <Navbar username={data ? data.data.username : ""} />
      <Input
        placeholder="Search"
        value={input}
        disabled={books?.data.length === 0}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      {books?.data.length === 0 && <EmptyState />}
      {books?.data.map((book) => {
        return <BookCard key={book._id} book={book} />;
      })}
    </MaxWidthContainer>
  );
}

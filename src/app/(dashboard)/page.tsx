"use client";

import BookCard from "@/components/BookCard";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import useLibraryBook from "@/hooks/useLibraryBook";
import { dummy_books } from "@/lib/dummy_book";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const { books } = useLibraryBook({ search: input });
  return (
    <MaxWidthContainer>
      <Navbar username="Krish Parekh" />
      <Input
        placeholder="Search"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      {books?.data.map((book) => {
        return <BookCard key={book._id} book={book} />;
      })}
    </MaxWidthContainer>
  );
}

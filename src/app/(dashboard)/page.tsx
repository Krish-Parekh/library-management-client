import BookCard from "@/components/BookCard";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { dummy_books } from "@/lib/dummy_book";

export default function Home() {
  
  return (
    <MaxWidthContainer>
      <Navbar username="Krish Parekh" />
      <Input placeholder="Search" />
      {dummy_books.map((book) => (
        <BookCard key={book.title} {...book} />
      ))}
    </MaxWidthContainer>
  );
}

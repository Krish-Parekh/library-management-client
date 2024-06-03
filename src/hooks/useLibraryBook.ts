import { Book } from "@/types/main";
import { useLibraryQuery } from "./useQuery";

const URLs = {
  get: "/book/",
};

export default function useLibraryBook() {
  const { data: books, isLoading: bookLoading } = useLibraryQuery<Book[]>(URLs.get);
  return { books, bookLoading };
}

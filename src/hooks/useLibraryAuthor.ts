import { Author, Book, TResponse } from "@/types/main";
import { useLibraryQuery } from "./useQuery";

const URLs = {
  get: "/author/",
};

export default function useLibraryAuthor() {
  const { data: authors, isLoading: authorLoading } = useLibraryQuery<
    TResponse<Author[]>
  >(URLs.get);
  return { authors, authorLoading };
}

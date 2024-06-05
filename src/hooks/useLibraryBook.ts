import { Book, TResponse } from "@/types/main";
import { useLibraryQuery } from "./useQuery";
import useSearchParams from "./useSearchParams";

const URLs = {
  get: "/book/",
};

interface IUseLibraryBook {
  search?: string;
}

export default function useLibraryBook({ search }: IUseLibraryBook) {
  const { data: books, isLoading: bookLoading } = useLibraryQuery<
    TResponse<Book[]>
  >(`${URLs.get}?search=${search}`);
  return { books, bookLoading };
}

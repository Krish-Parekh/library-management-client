import { Category, TResponse } from "@/types/main";
import { useLibraryQuery } from "./useQuery";

const URLs = {
  get: "/category/",
};

export default function useLibraryCategory() {
  const { data: categories, isLoading: categoryLoading } = useLibraryQuery<
    TResponse<Category[]>
  >(URLs.get);
  return { categories, categoryLoading };
}

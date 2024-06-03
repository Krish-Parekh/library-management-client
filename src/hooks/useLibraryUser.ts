import { User } from "@/types/main";
import { useLibraryQuery } from "./useQuery";

const URLs = {
  get: "/user/",
};

export default function useLibraryUser() {
  const { data: users, isLoading: userLoading } = useLibraryQuery<User[]>(URLs.get);
  return { users, userLoading };
}

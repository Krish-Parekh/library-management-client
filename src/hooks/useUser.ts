import React from "react";
import { useLibraryQuery } from "./useQuery";
import { Cookies } from "react-cookie";
import { UserIdKey } from "@/constants/strings";
import { TResponse, User } from "@/types/main";

const URLs = {
  user: "/user/",
};

export default function useUser() {
  const id = new Cookies().get(UserIdKey);
  const { data, isLoading } = useLibraryQuery<TResponse<User>>(`/user/${id}`);
  return { data, isLoading };
}

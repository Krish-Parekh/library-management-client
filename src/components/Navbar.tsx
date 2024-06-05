"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import { AccessTokenKey, RoleKey, UserIdKey } from "@/constants/strings";
import { cookieOptions } from "@/constants/cookie";

interface INavbarProps {
  username: string;
}

export default function Navbar({ username }: INavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    new Cookies().remove(AccessTokenKey, cookieOptions);
    new Cookies().remove(UserIdKey, cookieOptions);
    new Cookies().remove(RoleKey, cookieOptions);
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl">Hello, {username}</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { AccessTokenKey } from "@/constants/strings";
import { cookieOptions } from "@/constants/cookie";

interface INavbarProps {
  username: string;
}

export default function Navbar({ username }: INavbarProps) {
  const router = useRouter();
  const [{ access_token }, removeCookie] = useCookies([AccessTokenKey]);

  const handleLogout = useCallback(() => {
    removeCookie(AccessTokenKey, cookieOptions);
    router.replace("/login");
  }, [removeCookie, router]);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl">Hello, {username}</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

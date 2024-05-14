import React from "react";
import { Button } from "@/components/ui/button";

interface INavbarProps {
  username: string;
}

export default function Navbar({ username }: INavbarProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl">Hello, {username}</h1>
      <Button>Logout</Button>
    </div>
  );
}

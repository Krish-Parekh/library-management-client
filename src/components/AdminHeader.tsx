import React from "react";
import StatCard from "./StatCard";

interface AdminHeaderProps {
  userCount: number;
  bookCount: number;
  userLoading: boolean;
  bookLoading: boolean;
}
export default function AdminHeader({
  userCount,
  bookCount,
  userLoading,
  bookLoading,
}: AdminHeaderProps) {
  return (
    <div className="flex gap-x-4">
      <StatCard
        title="Users"
        count={userCount}
        type="users"
        isLoading={userLoading}
      />
      <StatCard
        title="Books"
        count={bookCount}
        type="books"
        isLoading={bookLoading}
      />
    </div>
  );
}

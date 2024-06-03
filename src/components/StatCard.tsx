import React from "react";
import { TStatCard } from "@/types/main";
import { MixerVerticalIcon, PersonIcon, ReaderIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AdminSheet } from "./AdminSheet";
import { Button } from "./ui/button";

interface StatCardProps {
  type: TStatCard;
  count: number;
  title: string;
  isLoading?: boolean;
}

const iconLookup: Record<TStatCard, React.ReactNode> = {
  users: <PersonIcon className="h-4 w-4 text-muted-foreground" />,
  books: <ReaderIcon className="h-4 w-4 text-muted-foreground" />,
  authors: <PersonIcon className="h-4 w-4 text-muted-foreground" />,
  categories: <MixerVerticalIcon className="h-4 w-4 text-muted-foreground" />,
};

export default function StatCard({
  type,
  count,
  title,
  isLoading,
}: StatCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {iconLookup[type]}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
      </CardContent>
      <CardFooter>
        <AdminSheet
          trigger={
            <Button className="w-full" variant="outline">
              Add {title}
            </Button>
          }
          title={`Add a new ${title}`}
          description={`Fill in the form below to add a new ${type}.`}
          type={type}
        />
      </CardFooter>
    </Card>
  );
}

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

const iconLookup: Record<string, React.ReactNode> = {
  "users": <PersonIcon className="h-4 w-4 text-muted-foreground" />, 
  "books": <ReaderIcon className="h-4 w-4 text-muted-foreground" />,
};

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {iconLookup[icon]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

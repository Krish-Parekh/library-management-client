import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IBookCardProps {
  title: string;
  description: string;
  tags: string[];
}

export default function BookCard({ title, description, tags }: IBookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Fiction</Badge>
          <Badge variant="outline">Adventure</Badge>
          <Badge variant="outline">Self-Discovery</Badge>
        </div>
        <Button>Download</Button>
      </CardContent>
    </Card>
  );
}

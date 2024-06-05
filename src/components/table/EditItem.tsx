"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import useSearchParams from "@/hooks/useSearchParams";
import { TStatCard } from "@/types/main";

export default function EditItem({ id, type }: { id: string, type: TStatCard }) {
  const [open, setOpen] = React.useState(false);
  const { updateSearchParams } = useSearchParams();

  const onEditIconClick = () => {
    setOpen(true);
    updateSearchParams({ id, type: type });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={onEditIconClick}>
      <Pencil1Icon className="h-4 w-4" />
    </Button>
  );
}

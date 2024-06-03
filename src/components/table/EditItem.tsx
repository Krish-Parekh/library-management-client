"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";

export default function EditItem() {
  const [open, setOpen] = React.useState(false);
  const onEditIconClick = () => {
    setOpen(true);
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

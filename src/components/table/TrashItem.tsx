"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLibraryDeleteMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import revalidate from "@/lib/revalidate";

interface TrashItemProps {
  url: string;
  revalidationURL: string[];
}

export default function TrashItem({ url, revalidationURL }: TrashItemProps) {
  const [open, setOpen] = React.useState(false);
  const { trigger, isMutating } = useLibraryDeleteMutation(url, {
    onSuccess(data) {
      toast.success("Item deleted successfully");
    },
  });

  const onDeleteIconClick = () => {
    setOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  const onConfirmDelete = () => {
    trigger();
    revalidationURL.forEach((url) => {
      revalidate(url);
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outline" size="icon" onClick={onDeleteIconClick}>
        <TrashIcon className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onConfirmDelete}>
            {isMutating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Delete
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

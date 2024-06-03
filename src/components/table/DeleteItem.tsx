import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useLibraryDeleteMutation } from "@/hooks/useMutation";
import { TResponse } from "@/types/main";
import { toast } from "sonner";
import revalidate from "@/lib/revalidate";

interface IDeleteItemProps {
  url: string;
  revalidateURL: string[];
}

export default function DeleteItem({ url, revalidateURL }: IDeleteItemProps) {
  const { trigger, isMutating } = useLibraryDeleteMutation<TResponse<string>>(
    url,
    {
      onSuccess(data) {
        toast.success(data.message);
        revalidateURL.forEach((url) => revalidate(url));
      },
      onError(error) {
        console.log(error);
      },
    }
  );
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full" variant="ghost">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full"
          disabled={isMutating}
          onClick={trigger}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TStatCard } from "@/types/main";
import BookForm from "./forms/BookForm";
import UserForm from "./forms/UserForm";
import AuthorForm from "./forms/AuthorForm";
import CategoryForm from "./forms/CategoryForm";
import useSearchParams from "@/hooks/useSearchParams";
import { Suspense } from "react";

interface AdminSheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  type: TStatCard;
}

const formLookup: Record<TStatCard, React.ReactNode> = {
  users: <UserForm />,
  books: <BookForm />,
  authors: <AuthorForm />,
  categories: <CategoryForm />,
};

export function AdminSheet({
  trigger,
  title,
  description,
  type,
}: AdminSheetProps) {
  const { updateSearchParams } = useSearchParams();
  return (
    <Suspense fallback={null}>
      <Sheet
        onOpenChange={(open: boolean) => {
          if (!open) {
            updateSearchParams({ id: undefined });
          }
        }}
      >
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="md:w-[500px]">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          {formLookup[type]}
        </SheetContent>
        <SheetClose />
      </Sheet>
    </Suspense>
  );
}

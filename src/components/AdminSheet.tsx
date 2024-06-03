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

interface AdminSheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  type: TStatCard;
}

const formLookup: Record<TStatCard, React.ReactNode> = {
  users: <UserForm />,
  books: <BookForm />,
};

export function AdminSheet({
  trigger,
  title,
  description,
  type,
}: AdminSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-[500px] sm:w-[540px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {formLookup[type]}
      </SheetContent>
    </Sheet>
  );
}

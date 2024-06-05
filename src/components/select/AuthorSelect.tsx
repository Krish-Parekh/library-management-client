import useLibraryCategory from "@/hooks/useLibraryCategory";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLibraryAuthor from "@/hooks/useLibraryAuthor";

interface AuthorSelectProps {
  id?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export default function AuthorSelect({
  id,
  onValueChange,
  defaultValue,
}: AuthorSelectProps ) {
  const { authors, authorLoading } = useLibraryAuthor();
  const options = authors?.data.map((author) => ({
    label: author.name,
    value: author._id,
  }));
  return (
    <Select disabled={authorLoading} onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select Author" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import useLibraryCategory from "@/hooks/useLibraryCategory";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  onValueChange: (value: string) => void;
}

export default function CategorySelect({ onValueChange }: CategorySelectProps) {
  const { categories, categoryLoading } = useLibraryCategory();
  const options = categories?.data.map((category) => ({
    label: category.name,
    value: category._id,
  }));
  return (
    <Select disabled={categoryLoading} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
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

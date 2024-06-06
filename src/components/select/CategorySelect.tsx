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
  defaultValue?: string;
}

export default function CategorySelect({ onValueChange, defaultValue ,...props }: CategorySelectProps) {
  const { categories, categoryLoading } = useLibraryCategory();
  const options = categories?.data.map((category) => ({
    label: category.name,
    value: category._id,
  }));
  return (
    <Select defaultValue={defaultValue} disabled={categoryLoading} onValueChange={onValueChange} {...props}>
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

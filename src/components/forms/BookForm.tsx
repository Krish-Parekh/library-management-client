"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Book, TBookCategory } from "@/types/main";
import { useLibraryPostMutation } from "@/hooks/useMutation";

const URLs = {
  post: "/book/",
};

interface IBookRequest extends Omit<Book, "_id"> {}

export const BookFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  author: z.string().min(3),
  isbn: z.string().length(13),
  category: z.string(),
});

export default function BookForm() {
  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      isbn: "",
      category: "fiction",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger, isMutating } = useLibraryPostMutation<IBookRequest, any>(
    URLs.post,
    {
      onSuccess(data) {
        const { message } = data;
        if(message){
          toast.success(message);
          form.reset();
        }
      },
    }
  );

  async function onSubmit(data: z.infer<typeof BookFormSchema>) {
    const payload: IBookRequest = {
      title: data.title,
      description: data.description,
      author: data.author,
      isbn: data.isbn,
      category: data.category as TBookCategory,
    };
    await trigger(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="eg. Sapiens" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your description here."
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="eg. Yuval Noah Harari" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.author?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="eg. 9780062316097" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.isbn?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue>{form.getValues("category")}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="biography">Biography</SelectItem>
                    <SelectItem value="self-help">Self-Help</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.category?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isMutating}>
          Add Book
        </Button>
      </form>
    </Form>
  );
}

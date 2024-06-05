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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Book, TBookCategory, TResponse } from "@/types/main";
import {
  useLibraryPostMutation,
  useLibraryPutMutation,
} from "@/hooks/useMutation";
import AuthorSelect from "../select/AuthorSelect";
import CategorySelect from "../select/CategorySelect";
import { UserIdKey } from "@/constants/strings";
import { Cookies } from "react-cookie";
import revalidate from "@/lib/revalidate";
import useSearchParams from "@/hooks/useSearchParams";
import { useLibraryQuery } from "@/hooks/useQuery";

const URLs = {
  post: "/book/",
};

interface IBookRequest {
  title: string;
  description: string;
  authorId: string;
  isbn: string;
  categoryId: TBookCategory;
  userId: string;
}

export const BookFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  authorId: z.string().min(3),
  isbn: z.string().length(13),
  categoryId: z.string(),
});

export default function BookForm() {
  const { get, updateSearchParams } = useSearchParams();
  const id = get("id");

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      authorId: "",
      isbn: "",
      categoryId: "fiction",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useLibraryQuery<TResponse<Book>>(`/book/${id}/`, {
    onSuccess(data) {
      if (data) {
        form.setValue("title", data.data.title);
        form.setValue("description", data.data.description);
        form.setValue("isbn", data.data.isbn);
        form.setValue("authorId", data.data.authorId._id);
        form.setValue("categoryId", data.data.categoryId._id);
      }
    },
  });

  const { trigger: update, isMutating: isUpdating } = useLibraryPutMutation<
    TResponse<string>
  >(`/book/${id}/`, {
    onSuccess(data) {
      if (data) {
        toast.success(data.message);
        form.reset();
        updateSearchParams({ id: undefined, type: undefined });
        revalidate(`/book/`);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { trigger, isMutating } = useLibraryPostMutation<IBookRequest, any>(
    URLs.post,
    {
      onSuccess(data) {
        const { message } = data;
        if (message) {
          toast.success(message);
          form.reset();
          revalidate(URLs.post);
        }
      },
    }
  );

  async function onSubmit(data: z.infer<typeof BookFormSchema>) {
    const userId = new Cookies().get(UserIdKey);
    const payload: IBookRequest = {
      title: data.title,
      description: data.description,
      authorId: data.authorId,
      isbn: data.isbn,
      categoryId: data.categoryId as TBookCategory,
      userId,
    };
    if (id) {
      await update(payload);
    } else {
      await trigger(payload);
    }
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
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <AuthorSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.authorId?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect onValueChange={field.onChange} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.categoryId?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isMutating}>
          {id ? "Submit" : "Add Book"}
        </Button>
      </form>
    </Form>
  );
}

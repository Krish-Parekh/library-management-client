import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import {
  useLibraryPostMutation,
  useLibraryPutMutation,
} from "@/hooks/useMutation";
import { Author, TResponse } from "@/types/main";
import { toast } from "sonner";
import revalidate from "@/lib/revalidate";
import { Cookies } from "react-cookie";
import { UserIdKey } from "@/constants/strings";
import useSearchParams from "@/hooks/useSearchParams";
import { useLibraryQuery } from "@/hooks/useQuery";
import { ReloadIcon } from "@radix-ui/react-icons";

export const AuthorFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

interface IAuthorFormRequest {
  name: string;
  description: string;
  userId: string;
}

export default function AuthorForm() {
  const { get, updateSearchParams } = useSearchParams();
  const id = get("id");

  const form = useForm<z.infer<typeof AuthorFormSchema>>({
    resolver: zodResolver(AuthorFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isLoading } = useLibraryQuery<TResponse<Author>>(
    id ? `/author/${id}/` : null,
    {
      onSuccess(data) {
        if (data) {
          form.setValue("name", data.data.name);
          form.setValue("description", data.data.description);
        }
      },
    }
  );

  const { trigger: update, isMutating: isUpdating } = useLibraryPutMutation<
    TResponse<string>
  >(`/author/${id}/`, {
    onSuccess(data) {
      if (data) {
        toast.success(data.message);
        updateSearchParams({ id: undefined, type: undefined });
        revalidate(`/author/`);
        revalidate(`/book/`);
        form.reset();
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { trigger, isMutating } = useLibraryPostMutation<
    IAuthorFormRequest,
    TResponse<Author>
  >("/author/", {
    onSuccess(data) {
      if (data.message) {
        toast.success(data.message);
        form.reset();
        revalidate("/author/");
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  async function onSubmit(data: z.infer<typeof AuthorFormSchema>) {
    const userId = new Cookies().get(UserIdKey);
    if (id) {
      return update({
        ...data,
        userId,
      });
    } else {
      trigger({
        ...data,
        userId,
      });
    }
  }
  return isLoading ? (
    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Krish Parekh" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
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
        <Button
          type="submit"
          className="w-full"
          disabled={isMutating || isUpdating}
        >
          {(isMutating || isUpdating) && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {id ? "Submit" : "Add Author"}
        </Button>
      </form>
    </Form>
  );
}

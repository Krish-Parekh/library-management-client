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
import { useLibraryPostMutation } from "@/hooks/useMutation";
import { Author, TResponse } from "@/types/main";
import { toast } from "sonner";
import revalidate from "@/lib/revalidate";
import { Cookies } from "react-cookie";
import { UserIdKey } from "@/constants/strings";

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
  const form = useForm<z.infer<typeof AuthorFormSchema>>({
    resolver: zodResolver(AuthorFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
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
    trigger({
      ...data,
      userId,
    });
  }
  return (
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
        <Button type="submit" className="w-full" disabled={isMutating}>
          Add Author
        </Button>
      </form>
    </Form>
  );
}

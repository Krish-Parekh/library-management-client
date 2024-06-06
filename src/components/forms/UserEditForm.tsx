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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { ReloadIcon } from "@radix-ui/react-icons";
import useSearchParams from "@/hooks/useSearchParams";
import { useLibraryQuery } from "@/hooks/useQuery";
import { TResponse, User } from "@/types/main";
import { useLibraryPutMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import revalidate from "@/lib/revalidate";

export const UserFormSchema = z.object({
  username: z.string().min(3),
  email: z.string().email({ message: "Invalid email address" }),
});

export default function UserEditForm() {
  const { get, updateSearchParams } = useSearchParams();
  const id = get("id");
  const { isLoading } = useLibraryQuery<TResponse<User>>(id ? `/user/${id}` : null , {
    onSuccess(data) {
      if (data) {
        form.setValue("username", data.data.username);
        form.setValue("email", data.data.email);
      }
    },
    shouldRetryOnError: false,
  });

  const { trigger, isMutating } = useLibraryPutMutation<TResponse<string>>(
    `/user/${id}`,
    {
      onSuccess(data) {
        toast.success("User updated successfully");
        revalidate("/user/");
        updateSearchParams({ id: undefined, type: undefined });
      },
      onError(error) {
        toast.error("Failed to update user");
        console.log(error);
      },
    }
  );

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof UserFormSchema>) {
    await trigger(data);
  }

  return isLoading ? (
    <ReloadIcon className="h-4 w-4 animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="eg. krish" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="eg. krish@gmail.com" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isMutating}>
          {isMutating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}

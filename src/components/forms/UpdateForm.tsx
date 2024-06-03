"use client";
import useSearchParams from "@/hooks/useSearchParams";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useLibraryQuery } from "@/hooks/useQuery";
import { TResponse, User } from "@/types/main";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useLibraryPutMutation } from "@/hooks/useMutation";

const UserUpdateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

export default function UserUpdateForm() {
  const { get } = useSearchParams();
  const id = get("id");

  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useLibraryQuery<TResponse<User>>(`/user/${id}/`, {
    onSuccess(data) {
      const { data: user } = data;
      if (user) {
        form.setValue("username", user.username);
        form.setValue("email", user.email);
      }
    },
  });

  const { trigger, isMutating } = useLibraryPutMutation<TResponse<string>>(
    `/user/${id}/`
  );

  async function onSubmit(data: z.infer<typeof UserUpdateSchema>) {
    await trigger(data);
  }

  return (
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
          Signup
        </Button>
      </form>
    </Form>
  );
}

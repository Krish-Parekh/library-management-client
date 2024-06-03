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
import { ReloadIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useLibraryPostMutation } from "@/hooks/useMutation";
import { toast } from "sonner";
import { TResponse } from "@/types/main";

interface TSignupRequest {
  username: string;
  email: string;
  password: string;
}

export const SignupFormSchema = z.object({
  username: z.string().min(3, { message: "Invalid username" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

export default function UserForm() {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger, isMutating } = useLibraryPostMutation<
    TSignupRequest,
    TResponse<Record<string, string>>
  >("/auth/signup", {
    onSuccess(data) {
      if (data.message) {
        toast.success(data.message);
        form.reset();
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(data: z.infer<typeof SignupFormSchema>) {
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
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

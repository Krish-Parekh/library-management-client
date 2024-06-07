"use client";

import useSearchParams from "@/hooks/useSearchParams";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useLibraryPostMutation } from "@/hooks/useMutation";
import { TResponse } from "@/types/main";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ResetPasswordFormSchema } from "./schema/auth.schema";

interface TResetPasswordRequest {
  userId: string;
  token: string;
  password: string;
}

const URLs = {
  post: "/auth/reset-password/",
};

export default function ResetPasswordForm() {
  const { get } = useSearchParams();
  const token = get("token");
  const userId = get("id");
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger, isMutating } = useLibraryPostMutation<
    TResetPasswordRequest,
    TResponse<string>
  >(URLs.post, {
    onSuccess(data) {
      if (data) {
        toast.success("Password reset successfully. You can now login.");
        router.replace("/login");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    if (!userId || !token) return;
    await trigger({ password: data.password, userId, token });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isMutating}>
          {isMutating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}

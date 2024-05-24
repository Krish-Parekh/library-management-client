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
import { cookieOptions } from "@/constants/cookie";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLibraryPostMutation } from "@/hooks/useMutation";
import { TResponse } from "@/types/main";
import { AccessTokenKey } from "@/constants/strings";
import { getExpiryFromToken, getRoleFromToken } from "@/lib/jwt";
import { ReloadIcon } from "@radix-ui/react-icons";

interface TLoginRequest {
  email: string;
  password: string;
}

interface TLoginResponse {
  token: string;
}

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

export default function LoginForm() {
  const router = useRouter();
  const setCookie = useCookies<string>([])[1];
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger, isMutating } = useLibraryPostMutation<
    TLoginRequest,
    TResponse<TLoginResponse>
  >("/auth/login", {
    onSuccess(data) {
      const { token } = data.data;
      if (data.message) {
        setCookie(AccessTokenKey, token, {
          ...cookieOptions,
          expires: getExpiryFromToken(token),
        });
        const role = getRoleFromToken(token);
        toast.success(data.message);
        form.reset();
        if (role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    await trigger(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <div>
          <Link href="/reset-password" className="text-sm">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isMutating}>
          {isMutating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
        <div className=" text-center">
          <Link href="/signup" className="text-sm">
            Don&apos;t have an account? Signup
          </Link>
        </div>
      </form>
    </Form>
  );
}

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
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import Link from "next/link";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <Form {...form}>
      <form className="space-y-4">
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
        <Button type="submit" className="w-full">
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

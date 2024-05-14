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

export const ResetPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ResetPasswordForm() {
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
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

        <Button type="submit" className="w-full">
          Send Link
        </Button>
      </form>
    </Form>
  );
}

import React, { Suspense } from "react";
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
import { Button } from "../ui/button";
import { useLibraryPostMutation } from "@/hooks/useMutation";
import { TResponse } from "@/types/main";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

interface TForgotPasswordRequest {
  email: string;
}

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const URLs = {
  post: "/auth/forgot-password/",
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger, isMutating } = useLibraryPostMutation<
    TForgotPasswordRequest,
    TResponse<string>
  >(URLs.post, {
    onSuccess(data) {
      if (data) {
        toast.success(
          "Password reset link sent successfully. Check your email."
        );
        router.replace("/login");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    await trigger(data);
  }
  return (
    <Suspense fallback={null}>
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
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isMutating}>
            {isMutating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Send Link
          </Button>
        </form>
      </Form>
    </Suspense>
  );
}

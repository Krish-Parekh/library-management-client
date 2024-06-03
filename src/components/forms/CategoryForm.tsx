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
import { Button } from "../ui/button";
import { useLibraryPostMutation } from "@/hooks/useMutation";
import { Category, TResponse } from "@/types/main";
import { toast } from "sonner";
import revalidate from "@/lib/revalidate";
import { Cookies } from "react-cookie";
import { UserIdKey } from "@/constants/strings";

const URLs = {
  post: "/category/",
};

export const CategoryFormSchema = z.object({
  name: z.string().min(3),
});

interface ICategoryFormRequest {
  name: string;
  userId: string;
}

export default function CategoryForm() {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { trigger, isMutating } = useLibraryPostMutation<
    ICategoryFormRequest,
    TResponse<Category>
  >(URLs.post, {
    onSuccess(data) {
      if (data.message) {
        toast.success(data.message);
        form.reset();
        revalidate(URLs.post);
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  async function onSubmit(data: z.infer<typeof CategoryFormSchema>) {
    const userId = new Cookies().get(UserIdKey);
    trigger({ ...data, userId });
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
                <Input placeholder="eg. Fiction" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={false}>
          Add Category
        </Button>
      </form>
    </Form>
  );
}

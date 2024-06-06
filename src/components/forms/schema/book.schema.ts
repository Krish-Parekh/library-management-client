import { z } from "zod";

export const BookFormSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().min(10).max(1000),
  authorId: z.string(),
  isbn: z.string().length(13),
  categoryId: z.string(),
});

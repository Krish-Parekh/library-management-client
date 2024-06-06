import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(1).max(20),
});

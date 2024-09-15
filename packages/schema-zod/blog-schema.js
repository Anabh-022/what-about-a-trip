import { z } from "zod";

export const publishSchema = z.object({
  title: z.string().min(10, { message: "The blog title must have lenght 10" }),
  content: z.string().min(100, { message: "The blog content must have atleast 100 characters" }),
  author_id: z.string().length(36, { message: "Invalid author_id" })
})

import { Schema, z } from "zod";

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be string",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
    author: z.object({}),
    isPublished: z.boolean({}),
  }),
});

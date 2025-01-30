//NOTE - title: string – The title of the blog post.
// content: string – The main body or content of the blog post.
// author: ObjectId – A reference to the User model, indicating the author of the blog post.
// isPublished: boolean – A flag indicating whether the blog post is published. Default is true (published).
// createdAt: Date – The timestamp when the blog post was created.
// updatedAt: Date – The timestamp of the last update to the blog post.

// user
// _id
// name
// "Sakib"
// email
// "sakib@email.com"
// password
// "$2b$12$7u41GdYBZKJDPavLxNaIAuWeebUR/lLunzjDelnrYoKViFnxUfDyy"
// role
// "user"
// isBlocked
// false
// createdAt
// 2025-01-30T05:43:27.613+00:00
// updatedAt
// 2025-01-30T05:43:27.613+00:00
// __v
// 0
import { Schema, z } from "zod";

// createdAt: Date – The timestamp when the blog post was created.
const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be string",
    }),
    content:z.string({
        required_error:"Content is required",
    }),
    author:z.object({
    }),
    isPublished:z.boolean({
    })

  }),
});

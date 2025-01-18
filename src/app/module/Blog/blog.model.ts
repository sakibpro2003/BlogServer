import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";
// title: string – The title of the blog post.
// content: string – The main body or content of the blog post.
// author: ObjectId – A reference to the User model, indicating the author of the blog post.
// isPublished: boolean – A flag indicating whether the blog post is published. Default is true (published).
// createdAt: Date – The timestamp when the blog post was created.
// updatedAt: Date – The timestamp of the last update to the blog post.
const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // author:{

    // }
    isPublished: {
      type: Boolean,
      default:true
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model<TBlog>("Blog", blogSchema);

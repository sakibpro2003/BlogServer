import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Must be string",
    })
    .max(16, { message: "Password cannot exceed 16 chars" }),
  role: z.enum(["admin", "user"]),
  isBlocked: z.boolean().default(false),
});

export const UserValidation = {
  userValidationSchema,
};

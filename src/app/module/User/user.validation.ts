import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(16, { message: "Password cannot exceed 16 chars" }),
  role: z.enum(["admin", "user"]),
  isBlocked: z.boolean().default(false),

});

export const UserValidation = {
    userValidationSchema
}

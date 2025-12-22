import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(32, { message: "Name must be less than 32 characters" })
    .trim(),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, { message: "Password must be less than 32 characters" }),
});

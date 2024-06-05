import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    })
    .min(8),
});

export const SignupFormSchema = z.object({
  username: z.string().min(3, { message: "Invalid username" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    })
    .min(8),
});

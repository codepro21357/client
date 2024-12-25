import * as z from "zod";

export const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Enter your password again!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordDataType = z.infer<typeof schema>;

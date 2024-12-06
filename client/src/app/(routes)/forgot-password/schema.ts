import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("Not a valid email address"),
});

export type ForgotPasswordDataType = z.infer<typeof schema>;

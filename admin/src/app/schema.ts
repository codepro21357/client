import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("Not a valid email address"),
  password: z.string().min(1, { message: "Password is required!" }),
});

export type LoginDataType = z.infer<typeof schema>;

import * as z from "zod";

export const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("Not a valid email address"),
  message: z.string().min(1, { message: "Message is required!" }),
});

export type ContactDataType = z.infer<typeof schema>;

import * as z from "zod";

export const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
    email: z
      .string()
      .min(1, { message: "Email is required!" })
      .email("Not a valid email address"),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required!" })
      .regex(
        /^(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
        {
          message: "Not a valid phone number",
        }
      ),
    country: z.string().min(1, { message: "Country is required!" }),
    address: z.string().min(1, { message: "Home address is required!" }),
    avatar: z.string().optional(),
    agreement: z.boolean().refine((value) => value === true, {
      message: "Must agree to our terms and conditions",
    }),
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

export type RegisterDataType = z.infer<typeof schema>;

import z from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  message: z.string().min(1, 'Message is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Not a valid email'),
});

export type ContactType = z.infer<typeof contactSchema>;

import z from 'zod';

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    country: z.string().min(1, 'Country is required'),
    address: z.string().min(1, 'Address is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Not a valid email'),
    password: z
      .string()
      .min(6, 'Password length must be greater than 6'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password field is required'),
    agreement: z.boolean(),
    avatar: z.string().min(1, 'Profile picture is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export type CreateUserType = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Not a valid email'),
  password: z.string().min(1, 'Password is required!'),
});

export const socialAuthSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Not a valid email'),
  avatar: z
    .object({
      public_id: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Old  password is required!'),
  newPassword: z.string().min(1, 'New  password is required!'),
});

export const updateProfilePictureSchema = z.object({
  avatar: z.string().min(1, 'Profile picture is required!'),
});

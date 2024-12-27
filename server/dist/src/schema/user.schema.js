"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePictureSchema = exports.updatePasswordSchema = exports.socialAuthSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default
    .object({
    firstName: zod_1.default.string().min(1, 'First name is required'),
    lastName: zod_1.default.string().min(1, 'Last name is required'),
    phoneNumber: zod_1.default.string().min(1, 'Phone number is required'),
    country: zod_1.default.string().min(1, 'Country is required'),
    address: zod_1.default.string().min(1, 'Address is required'),
    email: zod_1.default
        .string()
        .min(1, 'Email is required')
        .email('Not a valid email'),
    password: zod_1.default
        .string()
        .min(6, 'Password length must be greater than 6'),
    confirmPassword: zod_1.default
        .string()
        .min(1, 'Confirm password field is required'),
    agreement: zod_1.default.boolean(),
    avatar: zod_1.default.string().min(1, 'Profile picture is required'),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
});
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .min(1, 'Email is required')
        .email('Not a valid email'),
    password: zod_1.default.string().min(1, 'Password is required!'),
});
exports.socialAuthSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required'),
    email: zod_1.default
        .string()
        .min(1, 'Email is required')
        .email('Not a valid email'),
    avatar: zod_1.default
        .object({
        public_id: zod_1.default.string().optional().nullable(),
        url: zod_1.default.string().optional().nullable(),
    })
        .optional()
        .nullable(),
});
exports.updatePasswordSchema = zod_1.default.object({
    oldPassword: zod_1.default.string().min(1, 'Old  password is required!'),
    newPassword: zod_1.default.string().min(1, 'New  password is required!'),
});
exports.updateProfilePictureSchema = zod_1.default.object({
    avatar: zod_1.default.string().min(1, 'Profile picture is required!'),
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.contactSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(1, 'First name is required'),
    lastName: zod_1.default.string().min(1, 'Last name is required'),
    message: zod_1.default.string().min(1, 'Message is required'),
    email: zod_1.default
        .string()
        .min(1, 'Email is required')
        .email('Not a valid email'),
});

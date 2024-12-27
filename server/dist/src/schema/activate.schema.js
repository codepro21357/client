"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.activateUserSchema = zod_1.default.object({
    activation_token: zod_1.default.string().min(1, 'Activation token is required'),
    activation_code: zod_1.default.string().min(1, 'Activation code is required'),
});

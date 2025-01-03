"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    country: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least six (6) characters'],
    },
    agreement: Boolean,
    avatar: {
        public_id: String,
        url: String,
    },
    equity: { type: String, default: '0.00' },
    balance: { type: String, default: '0.00' },
    openPl: { type: String, default: '0.00' },
    closePl: { type: String, default: '0.00' },
    freeMargin: { type: String, default: '0.00' },
    marginLevel: { type: String, default: '0.00' },
    credit: { type: String, default: '0.00' },
    token: { type: String, default: '' },
    role: { type: String, default: 'user' },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        if (!user.password)
            return;
        const salt = yield bcrypt_1.default.genSalt(config_1.default.get('saltWorkFactor'));
        const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    });
});
const userModel = mongoose_1.default.model('User', UserSchema);
exports.default = userModel;

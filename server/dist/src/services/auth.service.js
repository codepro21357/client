"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateToken = exports.socialAuth = exports.logoutUser = exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const comparePasswords_utils_1 = __importDefault(require("../utils/comparePasswords.utils"));
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const cloudinary_1 = require("cloudinary");
const message_model_1 = __importDefault(require("../models/message.model"));
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: input.email });
    if (user) {
        throw new errorHandler_utils_1.default('Email has been used', 400);
    }
    const uploadResult = yield cloudinary_1.v2.uploader.upload(input.avatar, {
        folder: 'profile',
    });
    const { avatar } = input, otherData = __rest(input, ["avatar"]);
    const data = Object.assign(Object.assign({}, otherData), { avatar: {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
        } });
    return yield user_model_1.default.create(data);
});
exports.createUser = createUser;
const loginUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: input.email });
    if (!user) {
        const error = new errorHandler_utils_1.default('Invalid email or password', 401);
        throw error;
    }
    const isMatch = yield (0, comparePasswords_utils_1.default)({
        inputPassword: input.password,
        userPassword: (user === null || user === void 0 ? void 0 : user.password) || '',
    });
    if (!isMatch) {
        const error = new errorHandler_utils_1.default('Invalid email or password', 401);
        throw error;
    }
    return user;
});
exports.loginUser = loginUser;
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        const error = new errorHandler_utils_1.default('Email is required!', 400);
        throw error;
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        const error = new errorHandler_utils_1.default('user not found!', 404);
        throw error;
    }
    return user;
});
exports.forgotPassword = forgotPassword;
const resetPassword = (password, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        const error = new errorHandler_utils_1.default('Password is required!', 400);
        throw error;
    }
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        const error = new errorHandler_utils_1.default('user not found!', 404);
        throw error;
    }
    user.password = password;
    yield user.save();
    return user;
});
exports.resetPassword = resetPassword;
const logoutUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(id, { $set: { token: '' } }, { new: true });
    if (!user) {
        throw new errorHandler_utils_1.default('User ID does not exist', 404);
    }
});
exports.logoutUser = logoutUser;
const socialAuth = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: input.email });
    if (user) {
        return { user, message: 'social-auth-login' };
    }
    else {
        const newUser = yield user_model_1.default.create(input);
        return { user: newUser, message: 'social-auth-register' };
    }
});
exports.socialAuth = socialAuth;
//UPDATE TOKEN
const updateToken = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(id, { token }, { new: true });
    if (!user) {
        const error = new errorHandler_utils_1.default('No user found!', 404);
        throw error;
    }
    return user;
});
exports.updateToken = updateToken;
// DELETE ACCOUNT
const deleteAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield user_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new errorHandler_utils_1.default('User not found', 404);
    }
    if ((_a = user.avatar) === null || _a === void 0 ? void 0 : _a.public_id) {
        yield Promise.all([
            cloudinary_1.v2.uploader.destroy((_b = user.avatar) === null || _b === void 0 ? void 0 : _b.public_id),
            message_model_1.default.deleteMany({ senderId: user === null || user === void 0 ? void 0 : user._id }),
        ]);
    }
    else {
        yield message_model_1.default.deleteMany({ senderId: user === null || user === void 0 ? void 0 : user._id });
    }
    return user;
});
exports.deleteAccount = deleteAccount;

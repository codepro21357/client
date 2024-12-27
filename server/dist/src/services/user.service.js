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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAnalytics = exports.deleteUser = exports.updateUserRole = exports.updateProfilePicture = exports.updateUserPassword = exports.updateUser = exports.getAllUsers = exports.getUser = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_model_1 = __importDefault(require("../models/user.model"));
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const comparePasswords_utils_1 = __importDefault(require("../utils/comparePasswords.utils"));
// GET USER
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new errorHandler_utils_1.default('User not found', 404);
    }
    return user;
});
exports.getUser = getUser;
// GET ALL USERS
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find().sort({ createdAt: -1 });
    return users;
});
exports.getAllUsers = getAllUsers;
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true });
    if (!user) {
        throw new errorHandler_utils_1.default('User ID does not exist', 404);
    }
    return user;
});
exports.updateUser = updateUser;
const updateUserPassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new errorHandler_utils_1.default('User ID does not exist', 404);
    }
    const isMatch = yield (0, comparePasswords_utils_1.default)({
        inputPassword: payload.oldPassword,
        userPassword: user.password || '',
    });
    if (!isMatch) {
        throw new errorHandler_utils_1.default('Old password is incorrect', 401);
    }
    user.password = payload.newPassword;
    const newUser = yield user.save();
    return newUser;
});
exports.updateUserPassword = updateUserPassword;
// UPDATE PROFILE PICTURE
const updateProfilePicture = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, avatar, }) {
    var _b;
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new errorHandler_utils_1.default('User not found', 404);
    }
    if ((_b = user === null || user === void 0 ? void 0 : user.avatar) === null || _b === void 0 ? void 0 : _b.public_id) {
        yield cloudinary_1.default.v2.uploader.destroy(user.avatar.public_id);
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
        });
        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    else {
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
        });
        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    yield user.save();
    return user;
});
exports.updateProfilePicture = updateProfilePicture;
const updateUserRole = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, role, }) {
    const user = yield user_model_1.default.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
        throw new errorHandler_utils_1.default('User not found', 404);
    }
    return user;
});
exports.updateUserRole = updateUserRole;
// DELETE USER
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield user_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new errorHandler_utils_1.default('User not found', 404);
    }
    if ((_a = user.avatar) === null || _a === void 0 ? void 0 : _a.public_id) {
        yield cloudinary_1.default.v2.uploader.destroy((_b = user.avatar) === null || _b === void 0 ? void 0 : _b.public_id);
    }
    return user;
});
exports.deleteUser = deleteUser;
//USERS ANALYTICS
const getUserAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = yield user_model_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear,
                },
            },
        },
        {
            $project: {
                month: { $month: '$createdAt' },
            },
        },
        {
            $group: {
                _id: '$month',
                total: { $sum: 1 },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]);
    return data;
});
exports.getUserAnalytics = getUserAnalytics;

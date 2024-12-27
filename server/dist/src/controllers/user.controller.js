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
exports.getUserAnalyticsHandler = exports.deleteUserHandler = exports.updateUserRoleHandler = exports.updateProfilePictureHandler = exports.updateUserPasswordHandler = exports.updateUserHandler = exports.getAllUsersHandler = exports.getUserHandler = void 0;
const user_service_1 = require("../services/user.service");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
// GET USER HANDLER
const getUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, user_service_1.getUser)(id);
        const _a = user.toJSON(), { password, token } = _a, others = __rest(_a, ["password", "token"]);
        res.status(200).json({ success: true, user: others });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getUserHandler = getUserHandler;
// GET ALL USERS HANDLER
const getAllUsersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        res.status(200).json({ success: true, users });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getAllUsersHandler = getAllUsersHandler;
// UPDATE USER HANDLER
const updateUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, user_service_1.updateUser)(id, req.body);
        const _a = user.toJSON(), { password, token } = _a, others = __rest(_a, ["password", "token"]);
        res.status(200).json({ success: true, user: others });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.updateUserHandler = updateUserHandler;
const updateUserPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_service_1.updateUserPassword)(id, req.body);
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.updateUserPasswordHandler = updateUserPasswordHandler;
// UPDATE PROFILE PICTURE HANDLER
const updateProfilePictureHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { avatar } = req.body;
        const user = yield (0, user_service_1.updateProfilePicture)({ id, avatar });
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.updateProfilePictureHandler = updateProfilePictureHandler;
const updateUserRoleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = yield (0, user_service_1.updateUserRole)({ id, role });
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.updateUserRoleHandler = updateUserRoleHandler;
//DELETE USER HANDLER
const deleteUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, user_service_1.deleteUser)(id);
        res.sendStatus(204);
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.deleteUserHandler = deleteUserHandler;
// USERS ANALYTICS HANDLER
const getUserAnalyticsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_1.getUserAnalytics)();
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getUserAnalyticsHandler = getUserAnalyticsHandler;

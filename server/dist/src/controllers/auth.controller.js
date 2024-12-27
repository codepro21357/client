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
exports.deleteAccountHandler = exports.socialAuthHandler = exports.updateAccessTokenHandler = exports.logoutUserHandler = exports.loginUserHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.activateUserHandler = exports.createUserHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const auth_service_1 = require("../services/auth.service");
const token_utils_1 = require("../utils/token.utils");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const user_service_1 = require("../services/user.service");
const axios_1 = __importDefault(require("axios"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const refreshTokenMaxAge = 3 * 24 * 60 * 60 * 1000;
const accessTokenMaxAge = 15 * 60 * 1000;
const refreshTokenSecret = config_1.default.get('refreshToken');
const accessTokenSecret = config_1.default.get('accessToken');
const verifyToken = config_1.default.get('verifyToken');
const activationSecret = config_1.default.get('activationSecret');
const createUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Register request made!');
    try {
        const _a = req.body, { captcha } = _a, otherInfo = __rest(_a, ["captcha"]);
        const response = yield axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captcha}`);
        if (!response.data.success) {
            logger_utils_1.default.error('Failed recaptcha!');
            throw new errorHandler_utils_1.default('Failed to validate reCAPTCHA. Please try again.', 400);
        }
        const user = yield (0, auth_service_1.createUser)(otherInfo);
        const payload = { id: user._id, role: user.role };
        const accessToken = (0, token_utils_1.createToken)(payload, 'accessToken');
        const refreshToken = (0, token_utils_1.createToken)(payload, 'refreshToken');
        const newUser = yield (0, user_service_1.updateUser)(user._id, {
            token: refreshToken,
        });
        const _b = newUser.toJSON(), { password, token } = _b, others = __rest(_b, ["password", "token"]);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: refreshTokenMaxAge,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: accessTokenMaxAge,
        });
        res
            .status(201)
            .json({ success: true, user: others, token: accessToken });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.createUserHandler = createUserHandler;
const activateUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_token, activation_code } = req.body;
        const decoded = jsonwebtoken_1.default.verify(activation_token, activationSecret);
        if (!decoded) {
            const error = new errorHandler_utils_1.default('Expired code', 401);
            return next(error);
        }
        const { id, activationCode } = decoded;
        if (activationCode === activation_code) {
            const user = yield (0, user_service_1.updateUser)(id, {
                isVerified: true,
            });
            res.status(200).json({ success: true, user });
        }
        else {
            const error = new errorHandler_utils_1.default('Invalid activation code', 401);
            next(error);
        }
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.activateUserHandler = activateUserHandler;
const forgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield (0, auth_service_1.forgotPassword)(email);
        const payload = { id: user._id, role: user.role };
        const token = (0, token_utils_1.createToken)(payload, 'verifyToken');
        const clientUrl = config_1.default.get('clientUrl');
        //Link
        const link = `Click on this link to reset your password ${clientUrl}/reset-password/${token}`;
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: 'Password Reset',
            html: link,
        };
        transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent!' });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const resetPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const decoded = jsonwebtoken_1.default.verify(token, verifyToken);
        if (!decoded) {
            const error = new errorHandler_utils_1.default('Expired link', 403);
            throw error;
        }
        const { id } = decoded;
        const user = yield (0, auth_service_1.resetPassword)(password, id);
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
const loginUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.loginUser)(req.body);
        const payload = { id: user._id, role: user.role };
        const accessToken = (0, token_utils_1.createToken)(payload, 'accessToken');
        const refreshToken = (0, token_utils_1.createToken)(payload, 'refreshToken');
        const newUser = yield (0, user_service_1.updateUser)(user._id, {
            token: refreshToken,
        });
        const _a = newUser.toJSON(), { password, token } = _a, others = __rest(_a, ["password", "token"]);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: refreshTokenMaxAge,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: accessTokenMaxAge,
        });
        res
            .status(200)
            .json({ success: true, user: others, token: accessToken });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.loginUserHandler = loginUserHandler;
const logoutUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, auth_service_1.logoutUser)(id);
        res.cookie('refreshToken', '', { maxAge: 1 });
        res.cookie('accessToken', '', { maxAge: 1 });
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.logoutUserHandler = logoutUserHandler;
const updateAccessTokenHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            const error = new errorHandler_utils_1.default('Not authenticated', 401);
            throw error;
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret);
        if (!decoded) {
            const error = new errorHandler_utils_1.default('Invalid token', 403);
            throw error;
        }
        req.user = decoded;
        const payload = { id: decoded.id, role: decoded.role };
        const accessToken = (0, token_utils_1.createToken)(payload, 'accessToken');
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: accessTokenMaxAge,
        });
        res.status(200).json({ success: true, token: accessToken });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.updateAccessTokenHandler = updateAccessTokenHandler;
const socialAuthHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, message } = yield (0, auth_service_1.socialAuth)(req.body);
        let statusCode;
        if (message === 'social-auth-register') {
            statusCode = 201;
        }
        else {
            statusCode = 200;
        }
        const payload = { id: user._id, role: user.role };
        const accessToken = (0, token_utils_1.createToken)(payload, 'accessToken');
        const refreshToken = (0, token_utils_1.createToken)(payload, 'refreshToken');
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: refreshTokenMaxAge,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: accessTokenMaxAge,
        });
        res
            .status(statusCode)
            .json({ success: true, user, token: accessToken });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.socialAuthHandler = socialAuthHandler;
//DELETE ACCOUNT HANDLER
const deleteAccountHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, auth_service_1.deleteAccount)(id);
        res.cookie('refreshToken', '', { maxAge: 1 });
        res.cookie('accessToken', '', { maxAge: 1 });
        res.sendStatus(204);
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.deleteAccountHandler = deleteAccountHandler;

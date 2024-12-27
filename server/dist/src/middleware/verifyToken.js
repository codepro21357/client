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
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const accessTokenSec = config_1.default.get('accessToken');
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization ||
            req.headers.Authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ success: false, message: 'Not authenticated' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, accessTokenSec);
        if (!decoded) {
            return res
                .status(403)
                .json({ success: false, message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        logger_utils_1.default.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res
                .status(403)
                .json({ success: false, message: 'Invalid token' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({
                success: false,
                message: 'JWT token has expired. Please try again!',
            });
        }
        res
            .status(500)
            .json({ success: false, message: 'Internal Server error' });
    }
});
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.id.toString() === req.params.id ||
            req.user.role === 'admin') {
            return next();
        }
        return res
            .status(403)
            .json({ success: false, message: 'Not authorized' });
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.role === 'admin') {
            return next();
        }
        return res
            .status(403)
            .json({ success: false, message: 'Not authorized' });
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const errorHandlerMiddleware = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Inter Server Error";
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    if (error.code === 1100) {
        const message = `Duplicate ${Object.keys(error.keyValue)} error`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    if (error.message.includes("1100")) {
        const message = `Email is not available, use another email.`;
        error = new errorHandler_utils_1.default(message, 400);
    }
    if (error.name === "JsonWebTokenError") {
        const message = "Invalid JWT token. Please try again!";
        error = new errorHandler_utils_1.default(message, 401);
    }
    if (error.name === "TokenExpiredError") {
        const message = "JWT token has expired. Please try again!";
        error = new errorHandler_utils_1.default(message, 401);
    }
    res.status(error.statusCode).json({ success: false, message: error.message });
};
exports.default = errorHandlerMiddleware;

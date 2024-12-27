"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (e) {
        logger_utils_1.default.error(e);
        const message = 'Validation error';
        res
            .status(400)
            .json({ success: false, message, errors: e.errors });
    }
};
exports.default = validateResource;

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
exports.deleteUserMessagesHandler = exports.getUserMessagesHandler = exports.createAdminMessageHandler = exports.createMessageHandler = void 0;
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const message_service_1 = require("../services/message.service");
// CREATE MESSAGE HANDLER
const createMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, message_service_1.createMessage)(req.body);
        res.status(201).json({ success: true, data });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.createMessageHandler = createMessageHandler;
// CREATE ADMIN MESSAGE HANDLER
const createAdminMessageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, message_service_1.createAdminMessage)(req.body);
        res.status(201).json({ success: true, message });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.createAdminMessageHandler = createAdminMessageHandler;
// GET USER MESSAGES HANDLER
const getUserMessagesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const messages = yield (0, message_service_1.getUserMessages)(chatId);
        res.status(200).json({ success: true, messages });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getUserMessagesHandler = getUserMessagesHandler;
// DELETE USER MESSAGES HANDLER
const deleteUserMessagesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const messages = yield (0, message_service_1.deleteUserMessages)(chatId);
        res.sendStatus(204);
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.deleteUserMessagesHandler = deleteUserMessagesHandler;

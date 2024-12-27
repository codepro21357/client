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
exports.getAllChatsHandler = void 0;
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const chat_service_1 = require("../services/chat.service");
// GET ALL CHATS HANDLER
const getAllChatsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield (0, chat_service_1.getAllChats)();
        res.status(200).json({ success: true, chats });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getAllChatsHandler = getAllChatsHandler;

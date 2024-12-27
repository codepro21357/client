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
exports.deleteUserMessages = exports.getUserMessages = exports.createAdminMessage = exports.createMessage = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
// CREATE MESSAGE
const createMessage = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const userChat = yield chat_model_1.default.findOne({ userId: input.senderId });
    if (userChat) {
        userChat.lastMessage = input.message;
        const [chat, message] = yield Promise.all([
            userChat.save(),
            message_model_1.default.create(input),
        ]);
        return { chat, message };
    }
    else {
        const chatData = {
            userId: input.senderId,
            name: input.name,
            lastMessage: input.message,
            avatar: input.avatar,
        };
        const [chat, message] = yield Promise.all([
            chat_model_1.default.create(chatData),
            message_model_1.default.create(input),
        ]);
        return { chat, message };
    }
});
exports.createMessage = createMessage;
// CREATE ADMIN MESSAGE
const createAdminMessage = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.default.create(input);
    return message;
});
exports.createAdminMessage = createAdminMessage;
// GET USER MESSAGES
const getUserMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield message_model_1.default.find({ chatId }).sort({
        createdAt: 1,
    });
    return chats;
});
exports.getUserMessages = getUserMessages;
// DELETE USER MESSAGES
const deleteUserMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const [deleteChatResult, deleteMessageResult] = yield Promise.all([
        chat_model_1.default.deleteOne({ userId: chatId }),
        message_model_1.default.deleteMany({ chatId }),
    ]);
    return { deleteChatResult, deleteMessageResult };
});
exports.deleteUserMessages = deleteUserMessages;

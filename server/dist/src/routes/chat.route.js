"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const chat_controller_1 = require("../controllers/chat.controller");
const router = (0, express_1.Router)();
// GET ALL CHATS
router.get('/:id', verifyToken_1.verifyTokenAndAdmin, chat_controller_1.getAllChatsHandler);
exports.default = router;

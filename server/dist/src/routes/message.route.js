"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
// GET USER MESSAGES
router.get('/:chatId', message_controller_1.getUserMessagesHandler);
// CREATE MESSAGE
router.post('/', message_controller_1.createMessageHandler);
// CREATE ADMIN MESSAGE
router.post('/admin', message_controller_1.createAdminMessageHandler);
// DELETE USER MESSAGES
router.delete('/:chatId', message_controller_1.deleteUserMessagesHandler);
exports.default = router;

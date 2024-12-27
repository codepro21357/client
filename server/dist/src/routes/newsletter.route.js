"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletter_controllers_1 = require("../controllers/newsletter.controllers");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
// CREATE NEWSLETTER
router.post('/', newsletter_controllers_1.createNewsletterHandler);
//GET ALL NEWSLETTERS
router.get('/', verifyToken_1.verifyTokenAndAdmin, newsletter_controllers_1.getAllNewslettersHandler);
// DELETE NEWSLETTER
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, newsletter_controllers_1.deleteNewsletterHandler);
exports.default = router;

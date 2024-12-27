"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const contact_schema_1 = require("../schema/contact.schema");
const router = (0, express_1.Router)();
// CONTACT ROUTE
router.post('/', (0, validateResource_1.default)(contact_schema_1.contactSchema), contact_controller_1.sendContactHandler);
exports.default = router;

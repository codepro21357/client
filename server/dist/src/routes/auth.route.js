"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const auth_controller_1 = require("../controllers/auth.controller");
const user_schema_1 = require("../schema/user.schema");
const activate_schema_1 = require("../schema/activate.schema");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.post('/register', (0, validateResource_1.default)(user_schema_1.createUserSchema), auth_controller_1.createUserHandler);
router.post('/login', (0, validateResource_1.default)(user_schema_1.loginUserSchema), auth_controller_1.loginUserHandler);
router.delete('/logout/:id', auth_controller_1.logoutUserHandler);
router.post('/activate-user', (0, validateResource_1.default)(activate_schema_1.activateUserSchema), auth_controller_1.activateUserHandler);
router.get('/refresh', auth_controller_1.updateAccessTokenHandler);
router.post('/forgot-password', auth_controller_1.forgotPasswordHandler);
router.post('/reset-password/:token', auth_controller_1.resetPasswordHandler);
router.post('/social-auth', (0, validateResource_1.default)(user_schema_1.socialAuthSchema), auth_controller_1.socialAuthHandler);
// DELETE ACCOUNT
router.delete('/accounts/:id', verifyToken_1.verifyTokenAndAuthorization, auth_controller_1.deleteAccountHandler);
exports.default = router;

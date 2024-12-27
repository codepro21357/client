"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const user_schema_1 = require("../schema/user.schema");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// GET USERS STATS ROUTE
router.get('/stats', verifyToken_1.verifyTokenAndAdmin, user_controller_1.getUserAnalyticsHandler);
// GET ALL USERS ROUTE
router.get('/', verifyToken_1.verifyTokenAndAdmin, user_controller_1.getAllUsersHandler);
// GET USER ROUTE
router.get('/:id', verifyToken_1.verifyTokenAndAuthorization, user_controller_1.getUserHandler);
// UPDATE USER ROUTE
router.put('/:id', verifyToken_1.verifyTokenAndAuthorization, user_controller_1.updateUserHandler);
// UPDATE PASSWORD ROUTE
router.put('/update-password/:id', verifyToken_1.verifyTokenAndAuthorization, (0, validateResource_1.default)(user_schema_1.updatePasswordSchema), user_controller_1.updateUserPasswordHandler);
// UPDATE PROFILE PICTURE ROUTE
router.put('/update-profile-picture/:id', verifyToken_1.verifyTokenAndAuthorization, (0, validateResource_1.default)(user_schema_1.updateProfilePictureSchema), user_controller_1.updateProfilePictureHandler);
// UPDATE USER ROLE
router.put('/update-role/id', verifyToken_1.verifyTokenAndAdmin, user_controller_1.updateUserRoleHandler);
// DELETE USER
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, user_controller_1.deleteUserHandler);
exports.default = router;

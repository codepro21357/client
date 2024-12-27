"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const overview_controller_1 = require("../controllers/overview.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
// GET OVERVIEW ROUTE
router.get('/', verifyToken_1.verifyTokenAndAdmin, overview_controller_1.getOverviewHandler);
// GET SALES ROUTE
router.get('/sales', verifyToken_1.verifyTokenAndAdmin, overview_controller_1.getSalesHandler);
exports.default = router;

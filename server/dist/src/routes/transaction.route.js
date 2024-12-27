"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
// GET ALL TRANSACTIONS
router.get('/', verifyToken_1.verifyTokenAndAdmin, transaction_controller_1.getAllTransactionsHandler);
// CREATE TRANSACTION
router.post('/:id', verifyToken_1.verifyTokenAndAuthorization, transaction_controller_1.createTransactionHandler);
// GET TRANSACTIONS
router.get('/details/:id', verifyToken_1.verifyTokenAndAdmin, transaction_controller_1.getTransactionHandler);
// GET SINGLE USER TRANSACTIONS
router.get('/:id', verifyToken_1.verifyTokenAndAuthorization, transaction_controller_1.getUserTransactionsHandler);
// UPDATE TRANSACTIONS
router.put('/:id', verifyToken_1.verifyTokenAndAuthorization, transaction_controller_1.updateTransactionHandler);
// DELETE TRANSACTION
router.delete('/:id', verifyToken_1.verifyTokenAndAdmin, transaction_controller_1.deleteTransactionHandler);
exports.default = router;

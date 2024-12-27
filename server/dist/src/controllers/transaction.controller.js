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
exports.deleteTransactionHandler = exports.updateTransactionHandler = exports.getAllTransactionsHandler = exports.getUserTransactionsHandler = exports.getTransactionHandler = exports.createTransactionHandler = void 0;
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const transaction_service_1 = require("../services/transaction.service");
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
// CREATE TRANSACTION HANDLER
const createTransactionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const transaction = yield (0, transaction_service_1.createTransaction)(req.body);
        res.status(201).json({ success: true, transaction });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        if ((_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes('Transaction validation failed')) {
            const error = new errorHandler_utils_1.default('Validation failed!', 400);
            next(error);
        }
        else {
            next(err);
        }
    }
});
exports.createTransactionHandler = createTransactionHandler;
// GET TRANSACTION HANDLER
const getTransactionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaction = yield (0, transaction_service_1.getTransaction)(id);
        res.status(200).json({ success: true, transaction });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getTransactionHandler = getTransactionHandler;
// GET SINGLE USER TRANSACTIONS HANDLER
const getUserTransactionsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transactions = yield (0, transaction_service_1.getUserTransactions)(id);
        res.status(200).json({ success: true, transactions });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getUserTransactionsHandler = getUserTransactionsHandler;
// GET ALL TRANSACTIONS HANDLER
const getAllTransactionsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, transaction_service_1.getAllTransactions)();
        res.status(200).json({ success: true, transactions });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getAllTransactionsHandler = getAllTransactionsHandler;
// UPDATE TRANSACTION HANDLER
const updateTransactionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaction = yield (0, transaction_service_1.updateTransaction)(id, req.body);
        res.status(200).json({ success: true, transaction });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.updateTransactionHandler = updateTransactionHandler;
//DELETE TRANSACTION HANDLER
const deleteTransactionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, transaction_service_1.deleteTransaction)(id);
        res.sendStatus(204);
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.deleteTransactionHandler = deleteTransactionHandler;

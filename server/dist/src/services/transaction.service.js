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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getAllTransactions = exports.getTransaction = exports.getUserTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
const cloudinary_1 = require("cloudinary");
// CREATE TRANSACTION
const createTransaction = (input) => __awaiter(void 0, void 0, void 0, function* () {
    if (input === null || input === void 0 ? void 0 : input.paymentScreenshot) {
        const uploadResult = yield cloudinary_1.v2.uploader.upload(input.paymentScreenshot, {
            folder: 'transaction',
        });
        const { paymentScreenshot } = input, otherData = __rest(input, ["paymentScreenshot"]);
        const data = Object.assign(Object.assign({}, otherData), { paymentScreenshot: {
                public_id: uploadResult.public_id,
                url: uploadResult.secure_url,
            } });
        return yield transaction_model_1.default.create(data);
    }
    const updatedData = Object.assign(Object.assign({}, input), { transactionType: 'withdraw' });
    return yield transaction_model_1.default.create(updatedData);
});
exports.createTransaction = createTransaction;
// GET USER TRANSACTIONS
const getUserTransactions = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.default.find({
        'user.userId': id,
    });
    return transactions;
});
exports.getUserTransactions = getUserTransactions;
// GET USER TRANSACTIONS
const getTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findById(id);
    if (!transaction) {
        throw new errorHandler_utils_1.default('Transaction not found', 404);
    }
    return transaction;
});
exports.getTransaction = getTransaction;
// GET ALL TRANSACTIONS
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.default.find({}).sort({
        createdAt: -1,
    });
    return transactions;
});
exports.getAllTransactions = getAllTransactions;
const updateTransaction = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true });
    if (!transaction) {
        throw new errorHandler_utils_1.default('Transaction ID does not exist', 404);
    }
    return transaction;
});
exports.updateTransaction = updateTransaction;
// DELETE TRANSACTION
const deleteTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const transaction = yield transaction_model_1.default.findByIdAndDelete(id);
    if (!transaction) {
        throw new errorHandler_utils_1.default('Transaction not found', 404);
    }
    if (transaction.transactionType === 'purchase') {
        yield cloudinary_1.v2.uploader.destroy((_b = (_a = transaction === null || transaction === void 0 ? void 0 : transaction.paymentScreenshot) === null || _a === void 0 ? void 0 : _a.public_id) !== null && _b !== void 0 ? _b : '');
    }
    return transaction;
});
exports.deleteTransaction = deleteTransaction;

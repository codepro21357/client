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
exports.getSales = exports.getOverview = void 0;
const newsletter_model_1 = __importDefault(require("../models/newsletter.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const [sales, totalPurchaseAmount, newsletters, transactions, users,] = yield Promise.all([
        transaction_model_1.default.aggregate([
            {
                $match: {
                    transactionType: 'purchase',
                    status: 'successful',
                },
            },
            {
                $project: {
                    total: { $toDouble: '$total' },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: '$total' },
                },
            },
        ]),
        transaction_model_1.default.aggregate([
            {
                $match: {
                    transactionType: 'purchase',
                    status: 'successful',
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: { $toDouble: '$amount' },
                    },
                },
            },
        ]),
        newsletter_model_1.default.find({}),
        transaction_model_1.default.find({}),
        user_model_1.default.find({}),
    ]);
    const overview = [];
    overview.push({
        id: 1,
        title: 'Sales',
        value: ((_a = sales[0]) === null || _a === void 0 ? void 0 : _a.totalSum) ? (_b = sales[0]) === null || _b === void 0 ? void 0 : _b.totalSum : 0,
    });
    overview.push({
        id: 2,
        title: 'Bitcoin',
        value: ((_c = totalPurchaseAmount[0]) === null || _c === void 0 ? void 0 : _c.totalAmount)
            ? (_d = totalPurchaseAmount[0]) === null || _d === void 0 ? void 0 : _d.totalAmount
            : 0,
    });
    overview.push({
        id: 3,
        title: 'Transactions',
        value: transactions.length,
    });
    overview.push({
        id: 4,
        title: 'Users',
        value: users.length,
    });
    overview.push({
        id: 5,
        title: 'Newsletters',
        value: newsletters.length,
    });
    return overview;
});
exports.getOverview = getOverview;
// GET SALES
const getSales = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = yield transaction_model_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear,
                },
                transactionType: 'purchase',
                status: 'successful',
            },
        },
        {
            $project: {
                month: { $month: '$createdAt' },
                total: { $toDouble: '$total' },
            },
        },
        {
            $group: {
                _id: '$month',
                total: { $sum: '$total' },
                transactions: { $sum: 1 },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]);
    return data;
});
exports.getSales = getSales;

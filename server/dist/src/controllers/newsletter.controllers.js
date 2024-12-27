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
exports.deleteNewsletterHandler = exports.getAllNewslettersHandler = exports.createNewsletterHandler = void 0;
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const newsletter_1 = require("../services/newsletter");
// CREATE NEWSLETTER HANDLER
const createNewsletterHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsletter = yield (0, newsletter_1.createNewsletter)(req.body);
        res.status(201).json({ success: true, newsletter });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.createNewsletterHandler = createNewsletterHandler;
// GET ALL NEWSLETTER
const getAllNewslettersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsletters = yield (0, newsletter_1.getAllNewsletters)();
        res.status(200).json({ success: true, newsletters });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.getAllNewslettersHandler = getAllNewslettersHandler;
// DELETE NEWSLETTER
const deleteNewsletterHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, newsletter_1.deleteNewsletter)(id);
        console.log('Newsletter deleted successfully!');
        res.sendStatus(204);
    }
    catch (err) {
        logger_utils_1.default.error(err);
        next(err);
    }
});
exports.deleteNewsletterHandler = deleteNewsletterHandler;

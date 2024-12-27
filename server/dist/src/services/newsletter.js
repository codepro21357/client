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
exports.deleteNewsletter = exports.getAllNewsletters = exports.createNewsletter = void 0;
const newsletter_model_1 = __importDefault(require("../models/newsletter.model"));
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
// CREATE NEWSLETTER
const createNewsletter = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.create(input);
    return newsletter;
});
exports.createNewsletter = createNewsletter;
// GET ALL NEWSLETTERS
const getAllNewsletters = () => __awaiter(void 0, void 0, void 0, function* () {
    const newsletters = yield newsletter_model_1.default.find().sort({ createdAt: -1 });
    return newsletters;
});
exports.getAllNewsletters = getAllNewsletters;
// DELETE NEWSLETTER
const deleteNewsletter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.findByIdAndDelete(id);
    if (!newsletter) {
        throw new errorHandler_utils_1.default('Newsletter not found', 404);
    }
    return newsletter;
});
exports.deleteNewsletter = deleteNewsletter;

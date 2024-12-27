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
exports.sendContactHandler = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const errorHandler_utils_1 = __importDefault(require("../utils/errorHandler.utils"));
// SEND CONTACT HANDLER
const sendContactHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, message } = req.body;
        // Create email body
        const emailBody = `
      <h2>Contact Form Submission</h2>
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `;
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: process.env.TO_ADMIN,
            subject: 'From Reinholders',
            html: emailBody,
        };
        transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent!' });
    }
    catch (err) {
        logger_utils_1.default.error(err);
        const error = new errorHandler_utils_1.default('Failed to send email', 500);
        next(error);
    }
});
exports.sendContactHandler = sendContactHandler;

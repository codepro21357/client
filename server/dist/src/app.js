"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_utils_1 = __importDefault(require("./utils/errorHandler.utils"));
const error_1 = __importDefault(require("./middleware/error"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const transaction_route_1 = __importDefault(require("./routes/transaction.route"));
const newsletter_route_1 = __importDefault(require("./routes/newsletter.route"));
const overview_route_1 = __importDefault(require("./routes/overview.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    // preflightContinue: true,
};
app.set('trust proxy', true);
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', auth_route_1.default);
app.use('/api/users', user_route_1.default);
app.use('/api/transactions', transaction_route_1.default);
app.use('/api/newsletters', newsletter_route_1.default);
app.use('/api/overview', overview_route_1.default);
app.use('/api/chats', chat_route_1.default);
app.use('/api/messages', message_route_1.default);
app.use('/api/contacts', contact_route_1.default);
app.get('/healthcheck', (req, res) => res.sendStatus(200));
app.get('*', (req, res, next) => {
    const err = new errorHandler_utils_1.default(`Route ${req.originalUrl} not found`, 404);
    next(err);
});
app.use(error_1.default);
exports.default = app;

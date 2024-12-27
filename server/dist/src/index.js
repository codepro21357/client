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
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("config"));
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
const cloudinary_1 = require("cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./socket"));
const PORT = config_1.default.get('port');
const dbUri = config_1.default.get('dbUri');
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SEC_KEY,
});
const server = http_1.default.createServer(app_1.default);
socket_1.default.listen(server);
const connectDB = (url) => {
    return mongoose_1.default.connect(url);
};
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(dbUri);
        server.listen(PORT, () => logger_utils_1.default.info(process.env.SERVER_URL));
    }
    catch (e) {
        logger_utils_1.default.error(e);
        process.exit(1);
    }
});
startServer();

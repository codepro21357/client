"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivationToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const accessToken = config_1.default.get('accessToken');
const refreshToken = config_1.default.get('refreshToken');
const verifyToken = config_1.default.get('verifyToken');
const createToken = (payload, tokenType) => {
    let tokenSecret = '';
    let expiresIn = '';
    if (tokenType === 'accessToken') {
        tokenSecret = accessToken;
        expiresIn = '15m';
    }
    if (tokenType === 'refreshToken') {
        tokenSecret = refreshToken;
        expiresIn = '3d';
    }
    if (tokenType === 'verifyToken') {
        tokenSecret = verifyToken;
        expiresIn = '5m';
    }
    const token = jsonwebtoken_1.default.sign(payload, tokenSecret, { expiresIn });
    return token;
};
exports.createToken = createToken;
const createActivationToken = (user) => {
    const activationSecret = config_1.default.get('activationSecret');
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({ id: user._id, activationCode }, activationSecret, {
        expiresIn: '5m',
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;

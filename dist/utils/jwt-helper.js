"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../env"));
const jwtTokens = (username, email, password, role) => {
    const user = { username, email, password, role };
    const accessToken = jsonwebtoken_1.default.sign(user, env_1.default.ACCESS_SECRET_TOKEN, { expiresIn: '2m' });
    const refreshToken = jsonwebtoken_1.default.sign(user, env_1.default.REFRESH_SECRET_TOKEN, { expiresIn: '1d' });
    return ({ accessToken, refreshToken });
};
exports.default = jwtTokens;

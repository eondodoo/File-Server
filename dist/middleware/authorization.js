"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../env"));
const access_token = process.env.ACCESS_TOKEN_SECRET;
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({ error: "Need to login" });
    jsonwebtoken_1.default.verify(token, env_1.default.ACCESS_SECRET_TOKEN, (error, user) => {
        if (error)
            return res.status(403).json({ error: error.message });
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;

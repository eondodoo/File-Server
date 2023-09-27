"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const protect = (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
};
exports.protect = protect;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isNotAuthenticated = exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/items');
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
const isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/users/login');
    }
};
exports.isNotAuthenticated = isNotAuthenticated;
const isAdmin = (req, res, next) => {
    if (req.user == null) {
    }
};
exports.isAdmin = isAdmin;

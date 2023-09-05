"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const passport_1 = __importDefault(require("passport"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
const router = (0, express_1.Router)();
router.post('/register', isAuthenticated_1.isAuthenticated, authController_1.register);
router.get('/register', (req, res) => {
    const excludeNavbar = true;
    res.render('register', { excludeNavbar });
});
router.get('/login', (req, res) => {
    const excludeNavbar = true;
    res.render('login', { excludeNavbar });
});
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/items',
    failureRedirect: '/users/login',
    failureFlash: true
}), (req, res) => {
});
router.get('/logout', isAuthenticated_1.isNotAuthenticated, authController_1.logout);
router.post('/forgotpassword', authController_1.forgotPassword);
// router.delete('/refresh_token', refreshToken)
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const passport_1 = __importDefault(require("passport"));
const isAuthenticated_1 = require("../middleware/isAuthenticated");
// import { protect } from '../middlewares/auth';
const router = (0, express_1.Router)();
router.post('/register', isAuthenticated_1.isAuthenticated, authController_1.register);
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', isAuthenticated_1.isAuthenticated, passport_1.default.authenticate('local', {
    successRedirect: '/items',
    failureRedirect: '/users/login',
    failureFlash: true
}), (req, res) => {
    console.log(req.user);
});
router.get('/logout', authController_1.logout);
router.post('/forgotpassword', authController_1.forgotPassword);
// router.delete('/refresh_token', refreshToken)
exports.default = router;

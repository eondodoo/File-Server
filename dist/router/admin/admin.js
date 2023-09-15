"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../../controllers/admin/admin");
const isAuthenticated_1 = require("../../middleware/isAuthenticated");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// router.use(isAdmin('admin'))
router.get('/dashboard', isAuthenticated_1.isAdmin, admin_1.getAllFiles);
router.get('/login', (req, res) => {
    const excludeNavbar = true;
    res.render('login', { excludeNavbar });
});
router.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
}), (req, res) => {
});
router.get('post/:id', isAuthenticated_1.isAdmin, admin_1.getFileById);
router.get('/add-post', isAuthenticated_1.isAdmin, admin_1.add);
router.post('/add-post', isAuthenticated_1.isAdmin, admin_1.addFile);
router.put('/update-post/:id', isAuthenticated_1.isAdmin, admin_1.updateFile);
router.delete('/delete-post/:id', isAuthenticated_1.isAdmin, admin_1.deleteFile);
exports.default = router;

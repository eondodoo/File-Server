"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../../controllers/admin/admin");
const isAuthenticated_1 = require("../../middleware/isAuthenticated");
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("../../database/db"));
const query_1 = __importDefault(require("../../database/query"));
const router = (0, express_1.Router)();
// router.use(isAdmin('admin'))
router.get('/dashboard', isAuthenticated_1.isAdmin, (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const excludeNavbar = false;
    const role = 'user';
    db_1.default.query(query_1.default.totalUsers, [role], (error, result) => {
        if (error)
            throw error;
        db_1.default.query(query_1.default.totalDownloads, (error, result1) => {
            if (error)
                throw error;
            db_1.default.query(query_1.default.totalFiles, (error, result2) => {
                if (error)
                    throw error;
                const data = result.rows.length;
                const downloads = result1.rows[0].sum;
                const files = result2.rows[0].count;
                res.render('dashboard', { data, downloads, files, name: req.user, isAuthenticated, excludeNavbar, });
            });
        });
    });
});
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
router.get('/posts', admin_1.getAllFiles);
router.get('/post/:id', admin_1.getFileById);
router.get('/add-post', isAuthenticated_1.isAdmin, admin_1.add);
router.post('/add-post', isAuthenticated_1.isAdmin, admin_1.addFile);
router.put('/update-post/:id', isAuthenticated_1.isAdmin, admin_1.updateFile);
router.get('/update-post/:id', isAuthenticated_1.isAdmin, admin_1.update);
router.delete('/delete-post/:id', isAuthenticated_1.isAdmin, admin_1.deleteFile);
exports.default = router;

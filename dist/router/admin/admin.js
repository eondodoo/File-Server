"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../../controllers/admin/admin");
const isAdmin_1 = require("../../middleware/isAdmin");
const router = (0, express_1.Router)();
// router.use(isAdmin('admin'))
router.get('/', (0, isAdmin_1.isAdmin)('admin'), admin_1.getAllFiles);
router.get('post/:id', (0, isAdmin_1.isAdmin)('admin'), admin_1.getFileById);
router.get('/add-post', (0, isAdmin_1.isAdmin)('admin'), admin_1.add);
router.post('/add-post', (0, isAdmin_1.isAdmin)('admin'), admin_1.addFile);
router.put('/update-post/:id', (0, isAdmin_1.isAdmin)('admin'), admin_1.updateFile);
router.delete('/delete-post/:id', (0, isAdmin_1.isAdmin)('admin'), admin_1.deleteFile);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../../controllers/main/main");
// import { authenticateToken } from '../../middleware/authorization'
const isAuthenticated_1 = require("../../middleware/isAuthenticated");
const router = (0, express_1.Router)();
router.get('', main_1.getAllFiles);
router.get('/:id', main_1.getFileById);
router.get('/:id/download', isAuthenticated_1.isNotAuthenticated, main_1.downloadFile);
router.get('/:id/send', main_1.sendFile);
router.get('/search', main_1.searchFiles);
exports.default = router;

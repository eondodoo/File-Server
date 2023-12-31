"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../../controllers/main/main");
const isAuthenticated_1 = require("../../middleware/isAuthenticated");
const router = (0, express_1.Router)();
router.get('', main_1.getAllFiles);
router.get('/search', main_1.searchFiles);
router.get('/:id', main_1.getFileById);
router.get('/:id/download', isAuthenticated_1.isNotAuthenticated, main_1.downloadFile);
router.get('/:id/send', isAuthenticated_1.isNotAuthenticated, main_1.send);
router.post('/:id/send', isAuthenticated_1.isNotAuthenticated, main_1.sendFile);
// router.get('/:send', isNotAuthenticated, sendFile)
exports.default = router;

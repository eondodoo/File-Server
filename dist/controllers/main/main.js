"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFile = exports.searchFiles = exports.downloadFile = exports.getFileById = exports.getAllFiles = void 0;
const db_1 = __importDefault(require("../../database/db"));
const query_1 = __importDefault(require("../../database/query"));
const fs_1 = require("fs");
const downloadCount_1 = require("../../middleware/downloadCount");
const sendMail_1 = require("../../middleware/sendMail");
const getAllFiles = (req, res) => {
    db_1.default.query(query_1.default.getAllFiles, (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const data = result.rows;
            const isAuthenticated = req.isAuthenticated();
            const excludeNavbar = false;
            // res.send(result.rows);
            res.render("home", {
                data,
                name: req.user,
                isAuthenticated,
                excludeNavbar,
            });
        }
        else {
            res.send("No files uploaded");
        }
    });
};
exports.getAllFiles = getAllFiles;
const getFileById = (req, res) => {
    const id = req.params.id;
    db_1.default.query(query_1.default.getFileById, [id], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const data = result.rows;
            const isAuthenticated = req.isAuthenticated();
            const excludeNavbar = false;
            return res.render("detail", {
                data,
                name: req.user,
                isAuthenticated,
                excludeNavbar,
            });
        }
        // return res.status(201).json(result.rows)
    });
};
exports.getFileById = getFileById;
const downloadFile = (req, res) => {
    const id = req.params.id;
    db_1.default.query(query_1.default.getFileById, [id], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const fileName = result.rows[0].imgurl;
            const filePath = "./public" + "/uploads/" + fileName;
            if ((0, fs_1.existsSync)(filePath)) {
                res.download(filePath, fileName);
                (0, downloadCount_1.download)(id);
            }
            else {
                res.send("No file found");
            }
        }
    });
};
exports.downloadFile = downloadFile;
const searchFiles = (req, res) => {
    const { search } = req.query;
    db_1.default.query(query_1.default.search, [`%${search}%`], (error, result) => {
        if (error)
            throw error;
        // res.send(result.rows)
        if (result.rows.length > 0) {
            const data = result.rows;
            const isAuthenticated = req.isAuthenticated();
            const excludeNavbar = false;
            res.render('search_result', { data,
                name: req.user,
                isAuthenticated,
                excludeNavbar, });
        }
        else {
            res.status(404).json({ message: "No file to match search" });
        }
    });
};
exports.searchFiles = searchFiles;
const sendFile = (req, res) => {
    const id = req.params.id;
    const authUser = req.user;
    db_1.default.query(query_1.default.getFileById, [id], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const fileName = result.rows[0].imgurl;
            const filePath = "./public" + "/uploads/" + fileName;
            if ((0, fs_1.existsSync)(filePath)) {
                (0, sendMail_1.sendMail)(fileName, authUser.email);
            }
            else {
                res.send("No file found");
            }
        }
    });
};
exports.sendFile = sendFile;

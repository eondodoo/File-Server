"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.updateFile = exports.update = exports.add = exports.addFile = exports.getFileById = exports.getAllFiles = exports.adminLogin = void 0;
const db_1 = __importDefault(require("../../database/db"));
const query_1 = __importDefault(require("../../database/query"));
const adminLogin = (req, res) => {
    const { email, password } = req.body;
    let errors = [];
    let user;
    if (!email || !password) {
        errors.push({ message: "Enter email or password" });
    }
    if (errors.length > 0) {
        res.status(401).send(errors);
    }
    else {
        db_1.default.query(query_1.default.checkEmail, [email], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length > 0) {
                user = result.rows[0];
                if (!user) {
                    errors.push({ message: "No User found" });
                }
                if (user.role == 'admin') {
                    res.redirect('admin/dashboard');
                }
            }
        });
    }
};
exports.adminLogin = adminLogin;
const getAllFiles = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const excludeNavbar = false;
    db_1.default.query(query_1.default.getAllFiles, (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const data = result.rows;
            res.render('admin_home', { data, name: req.user, isAuthenticated, excludeNavbar });
        }
        else {
            res.send("No records found");
        }
    });
};
exports.getAllFiles = getAllFiles;
const getFileById = (req, res) => {
    const id = parseInt(req.params.id);
    const isAuthenticated = req.isAuthenticated();
    const excludeNavbar = false;
    db_1.default.query(query_1.default.getFileById, [id], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const data = result.rows;
            res.render('admin_detail', { data, name: req.user, isAuthenticated, excludeNavbar });
        }
        ;
    });
};
exports.getFileById = getFileById;
const addFile = (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send("No files were uploaded");
    }
    const { name, description, category } = req.body;
    const downloads = 0;
    let uploadedFile = req.files.file;
    let filePath = "./public" + "/uploads/" + uploadedFile.name;
    uploadedFile.mv(filePath, (error) => {
        if (error)
            return res.status(400).send(error);
    });
    db_1.default.query(query_1.default.addFile, [name, description, category, uploadedFile.name, downloads], (error, result) => {
        if (error)
            throw error;
        res.redirect("/admin/dashboard");
    });
};
exports.addFile = addFile;
const add = (req, res) => {
    const excludeNavbar = false;
    const isAuthenticated = req.isAuthenticated();
    res.render("add_post", { excludeNavbar, name: req.user, isAuthenticated });
};
exports.add = add;
const update = (req, res) => {
    const id = req.params.id;
    const excludeNavbar = false;
    const isAuthenticated = req.isAuthenticated();
    db_1.default.query(query_1.default.getFileById, [id], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const data = result.rows;
            res.render("update_post", { data, excludeNavbar, name: req.user, isAuthenticated });
        }
    });
};
exports.update = update;
const updateFile = (req, res) => {
    const id = req.params.id;
    if (!req.files || !req.files.file) {
        return res.status(400).send("No files were uploaded");
    }
    const { name, description, category } = req.body;
    let uploadedFile = req.files.file;
    let filePath = "./public" + "/uploads/" + uploadedFile.name;
    uploadedFile.mv(filePath, (error) => {
        if (error)
            return res.status(400).send(error);
    });
    db_1.default.query(query_1.default.updateFile, [name, description, category, uploadedFile.name, id], (error, result) => {
        if (error)
            throw error;
    });
};
exports.updateFile = updateFile;
const deleteFile = (req, res) => {
    const id = req.params.id;
    db_1.default.query(query_1.default.deleteFile, [id], (error, result) => {
        if (error)
            throw error;
        // res.status(200).send('File deleted successfully')
        res.redirect("dashboard");
    });
};
exports.deleteFile = deleteFile;

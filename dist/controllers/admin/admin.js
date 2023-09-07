"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.updateFile = exports.add = exports.addFile = exports.getFileById = exports.getAllFiles = exports.adminLogin = void 0;
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
            res.render('dashboard', { name: req.user, isAuthenticated, excludeNavbar });
        }
        else {
            res.send("No records found");
        }
    });
};
exports.getAllFiles = getAllFiles;
const getFileById = (req, res) => {
    const id = parseInt(req.params.id);
    db_1.default.query(query_1.default.getFileById, [id], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            console.log(result.rows);
            console.log(req.user);
        }
        res.send(`Post detail of ${id}`);
    });
};
exports.getFileById = getFileById;
const addFile = (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send("No files were uploaded");
    }
    const { name, description, category } = req.body;
    let uploadedFile = req.files.file;
    let filePath = "./public" + "/uploads/" + uploadedFile.name;
    uploadedFile.mv(filePath, (error) => {
        if (error)
            return res.status(400).send(error);
        res.send("File uploaded");
    });
    db_1.default.query(query_1.default.addFile, [name, description, category, uploadedFile.name], (error, result) => {
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
        res.send("File uploaded");
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
    });
    res.redirect("dashboard");
};
exports.deleteFile = deleteFile;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const dotenv = __importStar(require("dotenv"));
const admin_1 = __importDefault(require("./router/admin/admin"));
const main_1 = __importDefault(require("./router/main/main"));
const authRoute_1 = __importDefault(require("./router/authRoute"));
const express_flash_1 = __importDefault(require("express-flash"));
const session = require("express-session");
const env_1 = __importDefault(require("./env"));
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = require("./middleware/passportConfig");
dotenv.config();
const app = (0, express_1.default)();
(0, passportConfig_1.initializePassport)(passport_1.default);
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.set('view engine', 'ejs');
app.use(express_ejs_layouts_1.default);
app.set('layout', './layouts/main');
app.use((0, express_fileupload_1.default)());
app.use((0, express_flash_1.default)());
app.use(session({
    secret: env_1.default.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.session());
app.use(passport_1.default.initialize());
// ROutes
app.get('', (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const excludeNavbar = false;
    return res.render("welcome", {
        name: req.user,
        isAuthenticated,
        excludeNavbar,
    });
});
app.use('/items', main_1.default);
app.use('/admin', admin_1.default);
app.use('/users', authRoute_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server up and running');
});

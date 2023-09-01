"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../env"));
const sendEmail = (options) => {
    const transport = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tukinettechnology@gmail.com',
            pass: env_1.default.PASSWORD,
        }
    });
    const message = {
        from: 'admin@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.text
    };
    transport.sendMail(message, (error) => {
        if (error)
            throw error;
    });
    console.log('message sent successfully');
};
exports.default = sendEmail;

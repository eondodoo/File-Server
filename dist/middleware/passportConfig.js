"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const passport_local_1 = __importDefault(require("passport-local"));
const db_1 = __importDefault(require("../database/db"));
const query_1 = __importDefault(require("../database/query"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const initializePassport = (passport) => {
    const authenticateUser = (email, password, done) => {
        db_1.default.query(query_1.default.checkEmail, [email], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length > 0) {
                const user = result.rows[0];
                bcrypt_1.default.compare(password, user.password, (error, isMatched) => {
                    if (error)
                        throw error;
                    if (isMatched) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: "Invalid Credentials " });
                    }
                });
            }
            else {
                return done(null, false, { message: "No user found " });
            }
        });
    };
    passport.use(new passport_local_1.default.Strategy({ usernameField: "email", passwordField: "password" }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        db_1.default.query(query_1.default.getUserByID, [id], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length > 0) {
                done(null, result.rows[0]);
            }
        });
    });
};
exports.initializePassport = initializePassport;

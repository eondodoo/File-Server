"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env_1 = __importDefault(require("../env"));
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: env_1.default.DB_PASSWORD,
    port: 5432,
    database: env_1.default.DB_NAME
});
exports.default = pool;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
const db_1 = __importDefault(require("../database/db"));
const query_1 = __importDefault(require("../database/query"));
const download = (id) => {
    db_1.default.query(query_1.default.downloadCount, [id], (error, result) => {
        if (error)
            throw error;
    });
};
exports.download = download;

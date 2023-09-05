"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const db_1 = __importDefault(require("../database/db"));
const query_1 = __importDefault(require("../database/query"));
const isAdmin = (username) => {
    return (req, res, next) => {
        db_1.default.query(query_1.default.checkUsername, [username], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (user.role == "admin") {
                    next();
                }
                else {
                    return res.status(403).json({ message: "Access Denied" });
                }
            }
        });
        next();
    };
};
exports.isAdmin = isAdmin;
// export const isAdmin =(req: Request, res: Response, next:NextFunction) =>{
//   if(req.isAuthenticated){
//     console.log(req.user)
//   }
// }

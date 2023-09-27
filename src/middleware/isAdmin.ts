import { NextFunction, Request, Response } from "express";
import pool from "../database/db";
import query from "../database/query";

export const isAdmin = (username: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    pool.query(query.checkUsername, [username], (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (user.role == "admin") {
          next();
        } else {
          return res.status(403).json({ message: "Access Denied" });
        }
      }
    });
    next();
  };
};

// export const isAdmin =(req: Request, res: Response, next:NextFunction) =>{
//   if(req.isAuthenticated){
//     console.log(req.user)
//   }
// }

import { NextFunction, Request, Response } from "express"
import query from "../database/query"
import pool from "../database/db"
import { User } from "../types/custom"


export const isAuthenticated=(req: Request, res: Response, next: NextFunction)=>{
    if(req.isAuthenticated()){
        return res.redirect('/items')
    }
    next() 
}

export const isNotAuthenticated=(req: Request, res: Response, next: NextFunction)=>{
    if(req.isAuthenticated()){
      return  next()
    }else{
        res.redirect('/users/login')
    }
}

export const isAdmin =(req: Request, res: Response, next: NextFunction)=>{ 
    // if(req.isAuthenticated()){
    //     const username = 'admin'
    //     pool.query(query.checkUsername, [username], (error, result) => {
    //         if (error) throw error;
    //         if (result.rows.length > 0) {
    //           const user = result.rows[0];
    //           if (user.role == "admin") {
    //             console.log('reached')
    //             // return res.send('reached')
    //           } else {
    //             return res.status(403).json({ message: "Access Denied" });
    //           }
    //         }
    //       });
    //       next();
        
    // }
    if(!req.isAuthenticated()){
        return res.redirect('/admin/login')
    }else{
        const authUser = req.user as User
        if(authUser.role == 'admin'){
            next()
        }
        else{
            res.send('You are not authroized')
        }
    }
}
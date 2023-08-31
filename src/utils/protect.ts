import { Request, Response } from "express";
export const protect = (req: Request, res: Response)=>{
    let token;
    if(req.headers.authorization &&req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

}
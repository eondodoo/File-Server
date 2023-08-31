import { NextFunction, Request, Response } from "express"


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

export const isAdmin=(req: Request, res: Response, next: NextFunction)=>{
    if(req.user== null){
    }
}
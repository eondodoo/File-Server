import { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken";
import env from "../env";

const access_token = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "Need to login" });
  jwt.verify(token, env.ACCESS_SECRET_TOKEN, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}



export { authenticateToken };

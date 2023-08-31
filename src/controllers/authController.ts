import { Request, Response } from "express";
import pool from "../database/db";
import query from "../database/query";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtTokens from "../utils/jwt-helper";
import env from "../env";
import sendEmail from "../utils/sendEmail";
import crypto from 'node:crypto'


export const register = (req: Request, res: Response) => {
  const { username, email, password, password2 } = req.body;
  let role = req.body.role;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ message: "All fields required" });
  }
  if (password.length < 5) {
    errors.push({ message: "Password should be at least 5 characters " });
  }
  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (!role) {
    role = "user";
  }
  if (errors.length > 0) {
    res.status(401).send(errors);
  } else {
    let hashedPassword = bcrypt.hashSync(password, 10);
    pool.query(query.checkEmail, [email], (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        // errors.push({ message: "Email already registered" });
        res.json({message: "Email already registered"})
      } else {
        pool.query(query.checkUsername, [username], (error, result) => {
          if (error) throw error;
          if (result.rows.length > 0) {
            errors.push({ message: "Username already exists" });
          } else {
            pool.query(
              query.addUser,
              [username, email, hashedPassword, role],
              (error, result) => {
                if (error) throw error;
                console.log("Registration Successful");
                res.redirect("login");
              }
            );
          }
        });
      }
    });
  }
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user;
  let errors = [];

  if (!email || !password) {
    errors.push({ message: "Enter email or password" });
  }
  if (errors.length > 0) {
    res.status(401).send(errors);
  } else {
    pool.query(query.checkEmail, [email], (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        user = result.rows[0];
        if (!user) {
          errors.push({ message: "No User found" });
          return res.status(401).json({message: 'No user found'})
        }
        const isMatched = bcrypt.compareSync(password, user.password);
        if (!isMatched) {
          errors.push({ message: "No User found" });
          return res.status(401).json({message: 'Wrong Credentials'})
        } 
        if(user.role == 'admin'){
          let tokens = jwtTokens(user.username, user.email, user.password, user.role);
          res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);

        }
        let tokens = jwtTokens(user.username, user.email, user.password, user.role);
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);
      }
    });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken == null)
      return res.status(401).json({ error: "No fresh token" });
    jwt.verify(refreshToken, env.REFRESH_SECRET_TOKEN, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      let tokens = jwtTokens(user.username, user.email, user.password, user.role);
      res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
      res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({ error: "Error occured" });
  }
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;
  let errors = [];
  const user = pool.query(
    query.checkEmail,
    [email],
    (error, result: QueryResult) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (!user) {
          errors.push({ message: "No User with email found" });
          return res.send("No user with email found ");
        }
        // res.send('all hail')
        // sendEmail({email: user.email})
        try {
          let resetPasswordToken = crypto.randomBytes(10).toString()
          user.resetToken = resetPasswordToken
          const message = `Click on link to reset your password ${resetPasswordToken}`
          sendEmail({
            email: user.email,
            subject: 'Password reset link', 
            message
          })
          return res.status(200).json({success: true, message: 'Email Sent'})
        } catch (error) {
          console.log(error)
          return res.status(400).json({message: error})
        }

      }
    }
  );
};
export const resetPassword = (req: Request, res: Response) => {
  let resetPasswordToken = env.PASSWORD_RESET_TOKEN
  const {email} = req.body
  try {
    pool.query(query.checkEmail, [email], (error, result)=>{
      if(error) throw error
      if(result.rows.length > 0){
        const user = result.rows[0]
        if(!user){
          return res.status(404).json({error: 'No User found'})
        }
        user.resetPasswordToken = resetPasswordToken
      }
    })
  } catch (error) {
    
  }
  
  res.send("forgot password");
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

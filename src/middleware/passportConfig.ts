import LocalStrategy from "passport-local";
import pool from "../database/db";
import query from "../database/query";
import bcrypt from "bcrypt";
import { User } from "../types/custom";

export const initializePassport = (passport: any) => {
  const authenticateUser = (email: string, password: string, done: any) => {
    pool.query(query.checkEmail, [email], (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (error, isMatched) => {
          if (error) throw error;

          if (isMatched) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid Credentials " });
          }
        });
      }else{
        return done(null, false, { message: "No user found " });

      }
    });
  };
  passport.use(
    new LocalStrategy.Strategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user: User, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: User['id'], done: any) => {
    pool.query(query.getUserByID, [id], (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        done(null, result.rows[0]);
      }
    });
  });
};

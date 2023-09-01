"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.resetPassword = exports.forgotPassword = exports.register = void 0;
const db_1 = __importDefault(require("../database/db"));
const query_1 = __importDefault(require("../database/query"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = __importDefault(require("../env"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const register = (req, res) => {
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
        res.render('register', { errors });
    }
    else {
        let hashedPassword = bcrypt_1.default.hashSync(password, 10);
        db_1.default.query(query_1.default.checkEmail, [email], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length > 0) {
                // errors.push({ message: "Email already registered" });
                errors.push({ message: "Email already registered" });
            }
            else {
                db_1.default.query(query_1.default.checkUsername, [username], (error, result) => {
                    if (error)
                        throw error;
                    if (result.rows.length > 0) {
                        errors.push({ message: "Username already exists" });
                    }
                    else {
                        db_1.default.query(query_1.default.addUser, [username, email, hashedPassword, role], (error, result) => {
                            if (error)
                                throw error;
                            req.flash("success_msg", "Registration Successful");
                            res.redirect("/users/login");
                        });
                    }
                });
            }
        });
    }
};
exports.register = register;
// export const login = (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   let user;
//   let errors = [];
//   if (!email || !password) {
//     errors.push({ message: "Enter email or password" });
//   }
//   if (errors.length > 0) {
//     res.status(401).send(errors);
//   } else {
//     pool.query(query.checkEmail, [email], (error, result) => {
//       if (error) throw error;
//       if (result.rows.length > 0) {
//         user = result.rows[0];
//         if (!user) {
//           errors.push({ message: "No User found" });
//           return res.status(401).json({message: 'No user found'})
//         }
//         const isMatched = bcrypt.compareSync(password, user.password);
//         if (!isMatched) {
//           errors.push({ message: "No User found" });
//           return res.status(401).json({message: 'Wrong Credentials'})
//         } 
//         // if(user.role == 'admin'){
//         //   let tokens = jwtTokens(user.username, user.email, user.password, user.role);
//         //   res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
//         // return res.redirect('dashboard');
//         // }
//         // let tokens = jwtTokens(user.username, user.email, user.password, user.role);
//         // res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
//         // return res.redirect('../items');
//         passport.serializeUser((user, done)=>{
//         })
//       }
//     });
//   }
// };
// export const refreshToken = (req: Request, res: Response) => {
//   try {
//     const refreshToken = req.cookies.refresh_token;
//     if (refreshToken == null)
//       return res.status(401).json({ error: "No fresh token" });
//     jwt.verify(refreshToken, env.REFRESH_SECRET_TOKEN, (error, user) => {
//       if (error) return res.status(403).json({ error: error.message });
//       let tokens = jwtTokens(user.username, user.email, user.password, user.role);
//       res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
//       res.json(tokens);
//     });
//   } catch (error) {
//     res.status(401).json({ error: "Error occured" });
//   }
// };
const forgotPassword = (req, res) => {
    const { email } = req.body;
    let errors = [];
    const user = db_1.default.query(query_1.default.checkEmail, [email], (error, result) => {
        if (error)
            throw error;
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (!user) {
                errors.push({ message: "No User with email found" });
                return res.send("No user with email found ");
            }
            // res.send('all hail')
            // sendEmail({email: user.email})
            try {
                let resetPasswordToken = node_crypto_1.default.randomBytes(10).toString();
                user.resetToken = resetPasswordToken;
                const message = `Click on link to reset your password ${resetPasswordToken}`;
                (0, sendEmail_1.default)({
                    email: user.email,
                    subject: 'Password reset link',
                    message
                });
                return res.status(200).json({ success: true, message: 'Email Sent' });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ message: error });
            }
        }
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => {
    let resetPasswordToken = env_1.default.PASSWORD_RESET_TOKEN;
    const { email } = req.body;
    try {
        db_1.default.query(query_1.default.checkEmail, [email], (error, result) => {
            if (error)
                throw error;
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (!user) {
                    return res.status(404).json({ error: 'No User found' });
                }
                user.resetPasswordToken = resetPasswordToken;
            }
        });
    }
    catch (error) {
    }
    res.send("forgot password");
};
exports.resetPassword = resetPassword;
const logout = (req, res) => {
    req.logout();
    req.flash('success_msg', "You have logged out");
    res.redirect('/users/login');
};
exports.logout = logout;

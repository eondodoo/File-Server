"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isNotAuthenticated = exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/items');
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
const isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/users/login');
    }
};
exports.isNotAuthenticated = isNotAuthenticated;
const isAdmin = (req, res, next) => {
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
    if (!req.isAuthenticated()) {
        return res.redirect('/admin/login');
    }
    else {
        const authUser = req.user;
        if (authUser.role == 'admin') {
            next();
        }
        else {
            res.send('You are not authroized');
        }
    }
};
exports.isAdmin = isAdmin;

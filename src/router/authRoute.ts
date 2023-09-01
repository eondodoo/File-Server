import { Router } from 'express';
import {
  register,
  // login,
  forgotPassword,
//   resetPassword,
  logout,
  // refreshToken
} from '../controllers/authController';
import passport from 'passport';
import { isAuthenticated, isNotAuthenticated } from '../middleware/isAuthenticated';
const router = Router();

router.post('/register',isAuthenticated, register)
router.get('/register', (req, res)=>{
  const excludeNavbar = true
  res.render('register', {excludeNavbar})
})
router.get('/login', (req, res)=>{
  const excludeNavbar = true
  const isAuthenticated = req.isAuthenticated
  res.render('login', {excludeNavbar})
})

router.post('/login',  passport.authenticate('local',{
  successRedirect: '/items',
  failureRedirect: '/users/login',
  failureFlash: true
}), (req, res)=>{
  
})
router.get('/logout', isNotAuthenticated, logout)
router.post('/forgotpassword', forgotPassword)

// router.delete('/refresh_token', refreshToken)

export default router
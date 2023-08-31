import { Router } from 'express';
import {
  register,
  // login,
  forgotPassword,
//   resetPassword,
  logout,
  // refreshToken
} from '../controllers/authController';
import { authenticateToken } from '../middleware/authorization';
import passport from 'passport';
import { isAuthenticated } from '../middleware/isAuthenticated';
// import { protect } from '../middlewares/auth';
const router = Router();

router.post('/register',isAuthenticated, register)
router.get('/register', (req, res)=>{
  res.render('register')
})
router.get('/login', (req, res)=>{
  res.render('login')
})
router.post('/login', isAuthenticated, passport.authenticate('local',{
  successRedirect: '/items',
  failureRedirect: '/users/login',
  failureFlash: true
}), (req, res)=>{
  console.log(req.user)
})
router.get('/logout', logout)
router.post('/forgotpassword', forgotPassword)

// router.delete('/refresh_token', refreshToken)

export default router
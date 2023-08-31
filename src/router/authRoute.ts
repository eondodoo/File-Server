import { Router } from 'express';
import {
  register,
  login,
  forgotPassword,
//   resetPassword,
  logout,
  refreshToken
} from '../controllers/authController';
import { authenticateToken } from '../middleware/authorization';
// import { protect } from '../middlewares/auth';
const router = Router();

router.post('/register', register)
router.get('/register', (req, res)=>{
  res.render('register')
})
router.get('/login', (req, res)=>{
  res.render('login')
})
router.post('/login', login)
router.delete('/logout',authenticateToken, logout)
router.post('/forgotpassword', forgotPassword)
router.get('/refresh_token', refreshToken)
// router.delete('/refresh_token', refreshToken)

export default router
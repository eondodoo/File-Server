import {Router} from 'express'
import { addFile, deleteFile, getAllFiles, getFileById, updateFile, add } from '../../controllers/admin/admin'
// import { authenticateToken } from '../../middleware/authorization'
import { isAdmin } from '../../middleware/isAuthenticated'
import passport from 'passport'
const router = Router()

// router.use(isAdmin('admin'))



router.get('/dashboard',isAdmin,getAllFiles)

router.get('/login', (req, res)=>{
    const excludeNavbar = true
    res.render('login', {excludeNavbar})
  })

router.post('/login',  passport.authenticate('local',{
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  }), (req, res)=>{
  
  })

router.get('post/:id',isAdmin,getFileById)
router.get('/add-post',isAdmin, add)
router.post('/add-post', isAdmin, addFile)
router.put('/update-post/:id', isAdmin, updateFile )
router.delete('/delete-post/:id', isAdmin, deleteFile)






export default router
import {Router} from 'express'
import { addFile, deleteFile, getAllFiles, getFileById, updateFile, add, update } from '../../controllers/admin/admin'
import { isAdmin } from '../../middleware/isAuthenticated'
import passport from 'passport'
import pool from '../../database/db'
import query from '../../database/query'
const router = Router()

// router.use(isAdmin('admin'))



router.get('/dashboard',isAdmin, (req,res)=>{
  const isAuthenticated = req.isAuthenticated()
  const excludeNavbar = false
  const role = 'user'
  
  pool.query(query.totalUsers, [role], (error, result) =>{
    if(error) throw error
    pool.query(query.totalDownloads, (error, result1)=>{
      if(error) throw error
      pool.query(query.totalFiles, (error, result2)=>{
        if(error) throw error
        const data = result.rows.length
        const downloads = result1.rows[0].sum
        const files = result2.rows[0].count
        res.render('dashboard', {data, downloads, files, name:req.user, isAuthenticated, excludeNavbar,})
      })
    })
  })
})

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

router.get('/posts', getAllFiles)
router.get('/post/:id', getFileById)
router.get('/add-post',isAdmin, add)
router.post('/add-post', isAdmin, addFile)
router.put('/update-post/:id', isAdmin,  updateFile )
router.get('/update-post/:id', isAdmin, update)
router.delete('/delete-post/:id', isAdmin, deleteFile)






export default router
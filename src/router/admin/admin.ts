import {Router} from 'express'
import { addFile, deleteFile, getAllFiles, getFileById, updateFile, add } from '../../controllers/admin/admin'
import { authenticateToken } from '../../middleware/authorization'
import { isAdmin } from '../../middleware/isAdmin'
const router = Router()

// router.use(isAdmin('admin'))



router.get('/',isAdmin('admin'),getAllFiles)
router.get('post/:id',isAdmin('admin'),getFileById)
router.get('/add-post',isAdmin('admin'), add)
router.post('/add-post', isAdmin('admin'), addFile)
router.put('/update-post/:id', isAdmin('admin'), updateFile )
router.delete('/delete-post/:id', isAdmin('admin'), deleteFile)






export default router
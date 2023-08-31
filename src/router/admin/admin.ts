import {Router} from 'express'
import { addFile, deleteFile, getAllFiles, getFileById, updateFile, add } from '../../controllers/admin/admin'
import { authenticateToken } from '../../middleware/authorization'
import { isAdmin } from '../../middleware/isAdmin'
const router = Router()

// router.use(isAdmin('admin'))



router.get('/',isAdmin('admin'),getAllFiles)
router.get('post/:id',isAdmin('admin'),getFileById)
router.get('/add-post', add)
router.post('/add-post', addFile)
router.put('/update-post/:id', authenticateToken, updateFile )
router.delete('/delete-post/:id', authenticateToken, deleteFile)






export default router
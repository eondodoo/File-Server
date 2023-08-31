import {Router} from 'express'
import { downloadFile, getAllFiles, getFileById, searchFiles, } from '../../controllers/main/main'
// import { authenticateToken } from '../../middleware/authorization'
import { isAuthenticated } from '../../middleware/isAuthenticated'
const router = Router()


router.get('',  getAllFiles)
router.get('/:id', getFileById)
router.get('/:id/download', isAuthenticated, downloadFile)
router.get('/search', searchFiles)

export default router 